import type { AxiosInstance } from "axios"
import type { CredentialsProvider } from "./types"
import { createAxios } from "./create-axios"

export function createGatewayApi(endpoint: string, getCredentials: CredentialsProvider): AxiosInstance {
    return createAxios(endpoint, getCredentials)
}
