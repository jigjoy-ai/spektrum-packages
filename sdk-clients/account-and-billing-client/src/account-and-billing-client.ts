import axios, { AxiosInstance } from "axios"

export class AccountAndBillingClient {
	private readonly endpoint: string
	private readonly api: AxiosInstance

	constructor(endpoint: string) {
		this.endpoint = endpoint
		this.api = axios.create({ baseURL: this.endpoint })
	}

	setAccessToken = (token: string) => {
		sessionStorage.setItem("accessToken", token)
	}
	
	getAccessToken = () => {
		return sessionStorage.getItem("accessToken")
	}
	
	clearAccessToken = () => {
		sessionStorage.removeItem("accessToken")
	}

	async sendMagicLinkChallenge(email: string) {
		const res: any = await this.api.post(`/account/challenge/magic-link`, { email: email })
		return res.data
	}

	async verifyMagicLinkChallenge(email: string, challengeResponse: string) {

		const options = {
			email: email,
			challenge: challengeResponse
		}

		const res: any = await this.api.post(`/account/challenge/magic-link/verify`, options)
		this.setAccessToken(res.data.accessToken)
		return res.data

	}

	logout() {
		this.clearAccessToken()
	}

	hasAccessToken(){
		const accessToken = this.getAccessToken()
		return accessToken !== null
	}
}
