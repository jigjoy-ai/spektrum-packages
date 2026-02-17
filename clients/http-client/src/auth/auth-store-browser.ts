import type { Credentials } from "../types"
import { creds } from "./credentials"

const ACCESS_TOKEN_KEY = "accessToken"

export const authStoreBrowser = {
    setAccessToken(token: string) {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
    },

    clear() {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    },

    hasAccessToken(): boolean {
        return !!sessionStorage.getItem(ACCESS_TOKEN_KEY)
    },

    getCredentials(): Credentials {
        const token = sessionStorage.getItem(ACCESS_TOKEN_KEY)
        return token ? creds.bearer(token) : creds.none()
    },
}
