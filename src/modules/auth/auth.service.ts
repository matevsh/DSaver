import { HttpError } from "../../common/error-handling/errors";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { client } from "../../database/client";
import { compare, hash } from "../hash/hash";

export const authService = {
  isPasswordsSame(password: string, repeatPassword: string) {
    if (password !== repeatPassword) {
      throw new HttpError(HTTP_RESPONSES.BAD_REQUEST);
    }
  },

  async checkInvitationCode(inputInvitationCode: string) {
    const invitationCode = await client.invitationCode.findFirst({
      where: {
        code: inputInvitationCode,
      },
      include: {
        user: true,
      },
    });

    if (!invitationCode || invitationCode.user) {
      throw new HttpError(HTTP_RESPONSES.INVALID_INVITATION_CODE);
    }

    return invitationCode;
  },

  async isLoginUnique(login: string) {
    const user = await client.user.findFirst({
      where: {
        login,
      },
    });

    if (user) throw new HttpError(HTTP_RESPONSES.LOGIN_NOT_UNIQUE);
  },

  async createUser(login: string, password: string, invitationCodeId: string) {
    const passwordHash = await hash(password);

    await client.user.create({
      data: {
        login: login,
        name: login,
        passwordHash,
        invitationCode: {
          connect: {
            id: invitationCodeId,
          },
        },
      },
    });
  },

  async getUserByLogin(login: string) {
    const user = await client.user.findFirst({
      where: {
        login,
      },
    });

    if (!user) throw new HttpError(HTTP_RESPONSES.INVALID_CREDENTIALS);

    return user;
  },

  async comparePassword(password: string, passwordHash: string) {
    const isSame = await compare(password, passwordHash);
    if (!isSame) throw new HttpError(HTTP_RESPONSES.INVALID_CREDENTIALS);
  },
};
