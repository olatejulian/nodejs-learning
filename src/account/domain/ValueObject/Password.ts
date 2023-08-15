import { compare, hash } from 'bcrypt';

import { ValueObject } from 'src/shared';

export class InvalidPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidPasswordError';
  }
}

export class Password extends ValueObject<string> {
  private static readonly MIN_LENGTH = 8;

  private static readonly MUST_BE_A_DEFINED_STRING = 'Must be a defined string';

  private static readonly MUST_BE_AT_LEAST_X_CHARACTERS = `Must have at least ${Password.MIN_LENGTH} characters`;

  private static readonly MUST_BE_VALID_FORMAT =
    'Must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character';

  private readonly SALT = 10;

  constructor(value: string) {
    Password.validate(value);

    super(value);
  }

  private static validate(value: string): void {
    const mustBeDefinedString = (value: string) =>
      value !== undefined && value !== null && typeof value === 'string';

    if (!mustBeDefinedString(value)) {
      throw new InvalidPasswordError(this.MUST_BE_A_DEFINED_STRING);
    }

    const passwordMustBeAtLeastXCharacters = (value: string) =>
      value.length >= this.MIN_LENGTH;

    if (!passwordMustBeAtLeastXCharacters(value)) {
      throw new InvalidPasswordError(this.MUST_BE_AT_LEAST_X_CHARACTERS);
    }

    const passwordMustBeValidFormat = (value: string) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialCharacters = /[!@#$%^&*()_+{}\\[\]:;<>,.?~]/.test(value);

      return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters;
    };

    if (!passwordMustBeValidFormat(value)) {
      throw new InvalidPasswordError(this.MUST_BE_VALID_FORMAT);
    }
  }

  public async hash(): Promise<void> {
    this.value = await hash(this.value, this.SALT);
  }

  public async compare(plainTextPassword: string): Promise<boolean> {
    return await compare(plainTextPassword, this.value);
  }
}
