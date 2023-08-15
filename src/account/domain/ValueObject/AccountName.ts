import { ValueObject } from 'src/shared';

export class InvalidAccountNameError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidAccountNameError';
  }
}

export class AccountName extends ValueObject<string> {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 20;

  private static readonly MUST_BE_A_DEFINED_STRING = 'Must be a defined string';
  private static readonly MUST_HAVE_AT_LEAST_X_CHARACTERS = `Must have at least ${AccountName.MIN_LENGTH} characters`;
  private static readonly MUST_HAVE_AT_MOST_X_CHARACTERS = `Must have at most ${AccountName.MAX_LENGTH} characters`;

  constructor(value: string) {
    AccountName.validate(value);

    super(value);
  }

  private static validate(value: string): void {
    const mustBeValid = (value: string) =>
      value !== null && value !== undefined && typeof value === 'string';

    if (!mustBeValid(value)) {
      throw new InvalidAccountNameError(this.MUST_BE_A_DEFINED_STRING);
    }

    const mustHaveAtLeastXCharacters = (value: string) =>
      value.length >= this.MIN_LENGTH;

    if (!mustHaveAtLeastXCharacters(value)) {
      throw new InvalidAccountNameError(this.MUST_HAVE_AT_LEAST_X_CHARACTERS);
    }

    const mustHaveAtMostXCharacters = (value: string) =>
      value.length <= this.MAX_LENGTH;

    if (!mustHaveAtMostXCharacters(value)) {
      throw new InvalidAccountNameError(this.MUST_HAVE_AT_MOST_X_CHARACTERS);
    }
  }
}
