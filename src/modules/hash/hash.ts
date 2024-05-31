import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hash(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function compare(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
