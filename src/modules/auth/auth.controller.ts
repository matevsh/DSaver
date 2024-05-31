import { Request, Response } from "express";
import { z } from "zod";
import { compare, hash } from "../hash/hash";
import { client } from "../../database/client";
import { response } from "../../common/response/create-response";
import { HTTP_RESPONSES } from "../../common/response/http-codes";
import { handleError } from "../../common/error-handling/handle-error";

const signUpSchema = z.object({
  login: z.string(),
  invitationCode: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
});

async function signUp(req: Request, res: Response) {
  try {
    const body = signUpSchema.parse(req.body);
    if (body.password !== body.repeatPassword) {
      throw new Error("Passwords do not match");
    }

    const invitationCode = await client.invitationCode.findFirst({
      where: {
        code: body.invitationCode,
      },
      include: {
        user: true,
      },
    });

    if (!invitationCode || invitationCode.user) {
      throw new Error("Invalid invitation code");
    }

    const passwordHash = await hash(body.password);

    await client.user.create({
      data: {
        login: body.login,
        name: body.login,
        passwordHash,
        invitationCode: {
          connect: {
            id: invitationCode.id,
          },
        },
      },
    });

    return response(res, {
      success: true,
      httpResponse: HTTP_RESPONSES.CREATED,
    });
  } catch (e) {
    handleError(res, e);
  }
}

const signInSchema = z.object({
  login: z.string(),
  password: z.string(),
});

async function signIn(req: Request, res: Response) {
  try {
    const body = signInSchema.parse(req.body);

    const user = await client.user.findFirst({
      where: {
        login: body.login,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const comparePasswords = await compare(body.password, user.passwordHash);

    if (!comparePasswords) {
      throw new Error("Invalid credentials");
    }

    req.session.user = user;
    return response(res, true);
  } catch (e) {
    console.log(e);
    return response(res, false);
  }
}

export function session(req: Request, res: Response) {
  const user = req.session.user;
  if (!user) {
    return response(res, {
      success: false,
      httpResponse: HTTP_RESPONSES.UNAUTHORIZED,
    });
  }

  const { passwordHash: _ph, ...responseUser } = user;

  return response(res, {
    success: true,
    data: responseUser,
  });
}

export function logout(req: Request, res: Response) {
  req.session.user = undefined;
  response(res, true);
}

export const authController = {
  signUp,
  signIn,
  session,
  logout,
};
