import { Account } from '../Account';
import { EmailAddress } from '../value-object';

export interface AccountRepository {
  save(account: Account): Promise<void>;

  getByEmailAddress(emailAddress: EmailAddress): Promise<Account | null>;
}
