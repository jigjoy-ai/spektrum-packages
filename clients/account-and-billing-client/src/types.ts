export interface UserData {
	userId: string
	organizationId: string
	email: string
	credits: number,
    apiKeys: ApiKey[]
}

export interface ApiKey {
	id: string
	name: string
	displayKey: string
	rawKey?: string
}

export interface AuthSession {
	accessToken: string
	userData: UserData
}