export interface UserData {
	id: string
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

export type Pagination = {
	pageNumber: number
	pageSize: number
}

export const DefaultPagination: Pagination = {
	pageNumber: 1,
	pageSize: 10,
}

export type PaginatedResult<T> = {
	items: T[]
	pagination: {
		pageNumber: number
		pageSize: number
		totalPages: number
		totalItems: number
	}
}

export type Transaction = {
    id: string
    organizationId: string
    invoicePdfUrl: string
    amount: number
    status: string
    createdAt: string
}