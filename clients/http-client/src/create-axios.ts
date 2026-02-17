import axios, { AxiosInstance } from "axios"
import type { CredentialsProvider } from "./types"

export function createAxios(baseURL: string, getCredentials: CredentialsProvider): AxiosInstance {
    const api = axios.create({ baseURL })

    api.interceptors.request.use((config) => {
        const c = getCredentials()

        config.headers = config.headers ?? {}

        // prevent stale creds
        delete (config.headers as any).Authorization
        delete (config.headers as any)["x-api-key"]
        delete (config.headers as any)["x-internal-token"]

        if (c.kind === "bearer") {
            ;(config.headers as any).Authorization = `Bearer ${c.token}`
        } else if (c.kind === "internal") {
            ;(config.headers as any)["x-internal-token"] = c.token
        }

        return config
    })

    return api
}
