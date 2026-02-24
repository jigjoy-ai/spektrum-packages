import { Auth } from "@heksagon/app"
import { authDataHeaders } from "@heksagon/http"
import { UserData } from "@jigjoy-ai/auth"
import { authStoreBrowser } from "@jigjoy-ai/http-client"
import type { AxiosInstance } from "@jigjoy-ai/http-client"
import { ApiKey, AuthSession } from "./types"

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

		const authSession: AuthSession = {
			accessToken: res.data.accessToken,
			userData: res.data.userData,
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

	async chargeAccount(providerCostUsd: number, auth?: Auth<UserData>): Promise<{ totalCostUsd: number }> {
		const res: any = await this.api.post(
			`/account/charge`, 
			{ providerCostUsd: providerCostUsd },
			{ headers: auth ? authDataHeaders(auth) : {} }
		)
		return res.data as { totalCostUsd: number }
	}

	logout() {
		authStoreBrowser.clear()
	}

	hasAccessToken(): boolean {
		return authStoreBrowser.hasAccessToken()
	}
}
