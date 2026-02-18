import axios, { AxiosInstance } from "axios"
import type { CredentialsProvider } from "./types"

export function createAxios(baseURL: string, getCredentials: CredentialsProvider): AxiosInstance {
    const api = axios.create({ baseURL })

    api.interceptors.request.use((config) => {
        const credentials = getCredentials()

        config.headers = config.headers ?? {}

        // prevent stale creds
        delete (config.headers as any).Authorization
        delete (config.headers as any)["x-api-key"]
        delete (config.headers as any)["x-internal-token"]

        if (credentials.kind === "bearer") {
            ;(config.headers as any).Authorization = `Bearer ${credentials.token}`
        } else if (credentials.kind === "internal") {
            ;(config.headers as any)["x-internal-token"] = credentials.token
        }

        return config
    })

    return api
}
