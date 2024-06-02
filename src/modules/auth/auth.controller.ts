import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { route } from "../../common/error-handling/route";
import { omit } from "../../utils/omit";
import {
  checkInvitationCode,
  comparePassword,
  createUser,
  getUserByLogin,
  isLoginUnique,
  isPasswordsSame,
} from "./auth.service";
import { signInSchema, signUpSchema } from "./auth.schema";

export const authController = {
  signUp: route(async ({ req }) => {
    const body = signUpSchema.parse(req.body);
    isPasswordsSame(body.password, body.repeatPassword);

    await isLoginUnique(body.login);
    const invitationCode = await checkInvitationCode(body.invitationCode);
    await createUser(body.login, body.password, invitationCode.id);

    return HTTP_RESPONSES.CREATED;
  }),

  signIn: route(async ({ req, session }) => {
    const body = signInSchema.parse(req.body);

    const user = await getUserByLogin(body.login);
    await comparePassword(body.password, user.passwordHash);

    session.set(user);
    return HTTP_RESPONSES.OK;
  }),

  session: route(({ session }) => {
    const user = session.get();
    if (!user) return HTTP_RESPONSES.UNAUTHORIZED;

    const data = omit(user, "passwordHash", "invitationCodeId");

    return { success: true, data };
  }),

  logout: route(({ session }) => {
    session.destroy();
    return HTTP_RESPONSES.OK;
  }),
};
