import { Auth } from "@heksagon/app"
import { authDataHeaders } from "@heksagon/http"
import { UserData } from "@jigjoy-ai/auth"
import { authStoreBrowser } from "@jigjoy-ai/http-client"
import type { AxiosInstance } from "@jigjoy-ai/http-client"
import { ApiKey, AuthSession, PaginatedResult, Pagination, Transaction } from "./types"

export class AccountAndBillingClient {
	constructor(private readonly api: AxiosInstance) {}

	async sendMagicLinkChallenge(email: string, auth?: Auth<UserData>): Promise<void> {
		const res: any = await this.api.post(
			`/account/challenge/magic-link`, 
			{ email: email }, 
			{ headers: auth ? authDataHeaders(auth) : {} }
		)
		return res.data
	}

	async verifyMagicLinkChallenge(email: string, challengeResponse: string, auth?: Auth<UserData>): Promise<AuthSession> {
		const options = {
			email: email,
			challenge: challengeResponse,
		}

		const res: any = await this.api.post(
			`/account/challenge/magic-link/verify`, 
			options, 
			{ headers: auth ? authDataHeaders(auth) : {} }
		)

		const accessToken = res.data.accessToken
		const userData = res.data.userData

		const authSession: AuthSession = {
			accessToken: accessToken,
			userData: {
				id: userData.id,
				organizationId: userData.organizationId,
				email: userData.email,
				credits: userData.credits,
				apiKeys: userData.apiKeys,
			},
		}
		authStoreBrowser.setAccessToken(authSession.accessToken)
		return authSession
	}

	async createApiKey(name: string, auth?: Auth<UserData>): Promise<ApiKey> {
		const res: any = await this.api.post(
			`/account/api-key`, 
			{ name: name },
			{ headers: auth ? authDataHeaders(auth) : {} }
		)
		return res.data
	}

	async charge(providerCostUsd: number, auth?: Auth<UserData>): Promise<{ totalCostUsd: number }> {
		const res: any = await this.api.post(
			`/account/credits/charge`, 
			{ providerCostUsd: providerCostUsd },
			{ headers: auth ? authDataHeaders(auth) : {} }
		)
		return res.data as { totalCostUsd: number }
	}

	async getTransactionHistory(pagination: Pagination, auth?: Auth<UserData>): Promise<PaginatedResult<Transaction>> {
		const res: any = await this.api.get(
			`/account/transaction/all?page=${pagination.pageNumber}&size=${pagination.pageSize}`,
			{ headers: auth ? authDataHeaders(auth) : {} }
		)

		return {
			items: res.data.items,
			pagination: res.data.pagination,
		}
	}

	async downloadInvoicePdf(transactionId: string, auth?: Auth<UserData>): Promise<Blob> {
		const res = await this.api.get(
			`/account/transaction/${transactionId}/invoice`,
			{ 
				headers: auth ? authDataHeaders(auth) : {},
				responseType: 'blob'
			}
		)
		return res.data
	}

	logout() {
		authStoreBrowser.clear()
	}

	hasAccessToken(): boolean {
		return authStoreBrowser.hasAccessToken()
	}
}
