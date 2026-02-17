import type { Credentials } from "../types"

export const creds = {

    none(): Credentials {
      	return { kind: "none" }
    },

    bearer(token: string): Credentials {
      	return { kind: "bearer", token }
    },

    internal(token: string): Credentials {
      	return { kind: "internal", token }
    },
}
