export enum ApiKeyStatus {
	ACTIVE = "ACTIVE",
	REVOKED = "REVOKED",
	DELETED = "DELETED",
}

export type ApiKey = {
    id: string,
    keyHash: string,
    organizationId: string,
    createdBy: string,
    displayKey: string,
    status: ApiKeyStatus,
    name: string,
    createdAt: string,
}