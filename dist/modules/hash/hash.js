import * as bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export async function hash(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS);
}
export async function compare(plain, hash) {
    return bcrypt.compare(plain, hash);
}
