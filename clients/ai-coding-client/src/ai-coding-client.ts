import { Task } from "@jigjoy-ai/task-contracts"
import type { AxiosInstance } from "@jigjoy-ai/http-client"
import { UserData } from "@jigjoy-ai/auth"
import { Auth } from "@heksagon/app"
import { authDataHeaders } from "@heksagon/http"

export enum ModuleType {
	FRONTEND = "FRONTEND",
}

export type Module = {
	id: string
	repositoryId: string
	type: ModuleType
}

export class AICodingClient {
	constructor(private readonly api: AxiosInstance) {}

	async initalizeModule(projectId: string, auth?: Auth<UserData>): Promise<Module> {
		try {
			const requestBody = {
				projectId: projectId,
			}

			const response = await this.api.post(
				`/ai/module/initialization`, 
				requestBody, 
				{ headers: auth ? authDataHeaders(auth) : {} 
			})

			return response.data
		} catch (error) {
			console.error("Error initializing react module:", error)
			throw error
		}
	}

	async developModule(task: Task, auth?: Auth<UserData>): Promise<{ totalCostInUSD: number }> {
		try {
			const response = await this.api.post(
				`/ai/module/development`, 
				{ task: task }, 
				{ headers: auth ? authDataHeaders(auth) : {} }
			)

			return response.data
		} catch (error) {
			console.error("Error developing:", error)
			throw error
		}
	}

	async deployModule(projectId: string, auth?: Auth<UserData>): Promise<{ moduleId: string; publicAppUrl: string }> {
		try {
			const requestBody = {
				projectId: projectId,
			}

			const response = await this.api.post(
				`/ai/module/deployment`, 
				requestBody, 
				{ headers: auth ? authDataHeaders(auth) : {} }
			)

			return response.data
		} catch (error) {
			console.error("Error deploying to production:", error)
			throw error
		}
	}
}
