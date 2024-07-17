import {Account} from './Account'
import {AccountName, EmailAddress, Password} from './value-object'

export class AccountFactory {
    public static create(props: {
        name: string
        emailAddress: string
        password: string
    }): Account {
        const {name, emailAddress, password} = props

        const hashedPassword = (password: string): Password => {
            const pwd = new Password(password)

            pwd.hash()

            return pwd
        }

        return Account.create({
            name: new AccountName(name),
            emailAddress: new EmailAddress(emailAddress),
            password: hashedPassword(password),
        })
    }
}
