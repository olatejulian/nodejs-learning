import {AccountId, AccountName, EmailAddress, Password} from './value-object'

export class Account {
    constructor(
        private readonly props: {
            id: AccountId
            name: AccountName
            emailAddress: EmailAddress
            password: Password
            createdAt: Date
        }
    ) {
        this.props = props
    }

    public static create(values: {
        name: AccountName
        emailAddress: EmailAddress
        password: Password
    }): Account {
        const {name, emailAddress, password} = values
        return new Account({
            id: AccountId.generateId(),
            name,
            emailAddress,
            password,
            createdAt: new Date(),
        })
    }

    public changeName(name: AccountName): void {
        this.props.name = name
    }

    public changeEmailAddress(emailAddress: EmailAddress): void {
        this.props.emailAddress = emailAddress
    }

    public changePassword(password: Password): void {
        this.props.password = password
    }

    get getId(): AccountId {
        return this.props.id
    }

    get getName(): AccountName {
        return this.props.name
    }

    get getEmailAddress(): EmailAddress {
        return this.props.emailAddress
    }

    public async comparePassword(plainPassword: string): Promise<boolean> {
        return this.props.password.compare(plainPassword)
    }
}
