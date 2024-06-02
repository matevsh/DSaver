import { Request } from "express";
import { User } from "@prisma/client";

export function getSessionHandlers(req: Request) {
  function get() {
    return req.session.user;
  }

  function set(user: User) {
    req.session.user = user;
  }

  function destroy() {
    req.session.user = undefined;
  }

  return {
    get,
    set,
    destroy,
  };
}

export type SessionHandlers = ReturnType<typeof getSessionHandlers>;
