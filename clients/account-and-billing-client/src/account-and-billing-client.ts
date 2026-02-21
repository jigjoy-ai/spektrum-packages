import { authStoreBrowser } from "@jigjoy-ai/http-client"
import type { AxiosInstance } from "@jigjoy-ai/http-client"

export class AccountAndBillingClient {
	constructor(private readonly api: AxiosInstance) {}

	async sendMagicLinkChallenge(email: string) {
		const res: any = await this.api.post(`/account/challenge/magic-link`, { email: email })
		return res.data
	}

	async verifyMagicLinkChallenge(email: string, challengeResponse: string) {
		const options = {
			email: email,
			challenge: challengeResponse,
		}

		const res: any = await this.api.post(`/account/challenge/magic-link/verify`, options)
		authStoreBrowser.setAccessToken(res.data.authSession.accessToken)
		return res.data
	}

	async createApiKey(name: string) {
		const res: any = await this.api.post(`/account/api-key`, {
			name: name,
		})
		return res.data
	}

	async chargeAccount(providerCostUsd: number) {
		const res: any = await this.api.post(`/account/charge`, {
			providerCostUsd: providerCostUsd,
		})
		return res.data as { totalCostUsd: number }
	}

	logout() {
		authStoreBrowser.clear()
	}

	hasAccessToken(): boolean {
		return authStoreBrowser.hasAccessToken()
	}
}
