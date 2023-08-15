import { ValueObject } from 'src/shared';
import { v4 as uuidv4, validate } from 'uuid';

export class InvalidAccountIdError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidAccountIdError';
  }
}

export class AccountId extends ValueObject<string> {
  private static readonly MUST_BE_VALID_UUID_STRING =
    'Must be a valid UUID string';

  constructor(value: string) {
    AccountId.validate(value);

    super(value);
  }

  public static generateId(): AccountId {
    return new AccountId(uuidv4().toString());
  }

  private static validate(value: string): void {
    if (!validate(value)) {
      throw new InvalidAccountIdError(this.MUST_BE_VALID_UUID_STRING);
    }
  }
}
