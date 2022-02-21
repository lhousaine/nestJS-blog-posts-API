import * as bcrypt from 'bcrypt';

export class PasswordHashing {

  public static async hashPassword(password) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  public static async verifyPasswordHash(password, hash) {
    return await bcrypt.compare(password, hash);
  }

}
