import type {
    Account,
    AccountRepository,
    EmailAddress,
} from '@core/account/domain'

export class InMemoryAccountRepository implements AccountRepository {
    private accounts: Account[] = []

    async save(account: Account): Promise<void> {
        this.accounts.push(account)
    }

    async getByEmailAddress(
        emailAddress: EmailAddress
    ): Promise<Account | null> {
        return (
            this.accounts.find(account =>
                account.getEmailAddress.equals(emailAddress)
            ) || null
        )
    }
}
