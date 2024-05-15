import { AccountId, AccountName, EmailAddress, Password } from './value-object';

export type AccountProps = {
  id: AccountId;
  name: AccountName;
  emailAddress: EmailAddress;
  password: Password;
  createdAt: Date;
};

export type CreateAccountProps = {
  name: AccountName;
  emailAddress: EmailAddress;
  password: Password;
};

export class Account {
  private props: AccountProps;

  constructor(props: AccountProps) {
    this.props = props;
  }

  public static create(props: CreateAccountProps): Account {
    return new Account({
      id: AccountId.generateId(),
      ...props,
      createdAt: new Date(),
    });
  }

  public changeName(name: AccountName): void {
    this.props.name = name;
  }

  public changeEmailAddress(emailAddress: EmailAddress): void {
    this.props.emailAddress = emailAddress;
  }

  public changePassword(password: Password): void {
    this.props.password = password;
  }

  get getId(): AccountId {
    return this.props.id;
  }

  get getName(): AccountName {
    return this.props.name;
  }

  get getEmailAddress(): EmailAddress {
    return this.props.emailAddress;
  }

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return this.props.password.compare(plainPassword);
  }
}
