export type AuthType = "public" | "internal" | "user" | "apiKey"

export type AuthContext =
	| { type: "public" }
	| { type: "internal"; service: string; userId: string; organizationId: string; internalToken: string }
	| { type: "user"; userId: string; organizationId: string }
	| { type: "apiKey"; keyId: string; organizationId: string; userId: string }

export class AuthError extends Error {
	status = 401
	constructor(message: string) {
		super(message)
		this.name = "AuthError"
	}
}

function h(headers: any, name: string): string | undefined {
	const v = headers?.[name] ?? headers?.[name.toLowerCase()]
	return Array.isArray(v) ? v[0] : v
}

export function extractAuthContext(headers: any): AuthContext {
	const type = h(headers, "x-auth-type") as AuthType | undefined
	if (!type) throw new AuthError("Missing x-auth-type")

	if (type === "public") return { type: "public" }

	if (type === "internal") {
		const service = h(headers, "x-internal-service")
		const userId = h(headers, "x-user-id")
		const organizationId = h(headers, "x-organization-id")
		const internalToken = h(headers, "x-internal-token")

		if (!service) throw new AuthError("Missing x-internal-service")
		if (!userId) throw new AuthError("Missing x-user-id")
		if (!organizationId) throw new AuthError("Missing x-organization-id")
		if (!internalToken) throw new AuthError("Missing x-internal-token")

		return { type: "internal", service, userId, organizationId, internalToken }
	}

	if (type === "user") {
		const userId = h(headers, "x-user-id")
		const organizationId = h(headers, "x-organization-id")

		if (!userId) throw new AuthError("Missing x-user-id")
		if (!organizationId) throw new AuthError("Missing x-organization-id")

		return { type: "user", userId, organizationId }
	}

	if (type === "apiKey") {
		const organizationId = h(headers, "x-organization-id")
		const keyId = h(headers, "x-api-key-id")
		const userId = h(headers, "x-user-id")

		if (!organizationId) throw new AuthError("Missing x-organization-id")
		if (!keyId) throw new AuthError("Missing x-api-key-id")
		if (!userId) throw new AuthError("Missing x-user-id")

		return { type: "apiKey", organizationId, keyId, userId }
	}

	throw new AuthError("Invalid x-auth-type")
}

export function authContextToHeaders(auth: AuthContext): Record<string, string> {
	const headers: Record<string, string> = {
		"x-auth-type": auth.type,
	}

	if (auth.type === "user") {
		headers["x-user-id"] = auth.userId
		headers["x-organization-id"] = auth.organizationId
	}

	if (auth.type === "apiKey") {
		headers["x-organization-id"] = auth.organizationId
		headers["x-api-key-id"] = auth.keyId
		headers["x-user-id"] = auth.userId
	}

	if (auth.type === "internal") {
		headers["x-internal-service"] = auth.service
		headers["x-user-id"] = auth.userId
		headers["x-organization-id"] = auth.organizationId
		headers["x-internal-token"] = auth.internalToken
	}

	return headers
}
