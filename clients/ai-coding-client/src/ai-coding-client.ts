import { Task } from "@jigjoy-ai/task-contracts"
import type { AxiosInstance } from "@jigjoy-ai/http-client"

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

	async initalizeModule(projectId: string): Promise<Module> {
		try {
			const requestBody = {
				projectId: projectId,
			}

			const response = await this.api.post(`/ai/module/initialization`, requestBody)

			return response.data
		} catch (error) {
			console.error("Error initializing react module:", error)
			throw error
		}
	}

	async developModule(task: Task, accountId: string): Promise<{ totalCostInUSD: number }> {
		try {
			const response = await this.api.post(`/ai/module/development`, { task: task, accountId: accountId })

			return response.data
		} catch (error) {
			console.error("Error developing:", error)
			throw error
		}
	}

	async deployModule(projectId: string): Promise<{ moduleId: string, publicAppUrl: string }> {
		try {
			const requestBody = {
				projectId: projectId,
			}

			const response = await this.api.post(`/ai/module/deployment`, requestBody)

			return response.data
		} catch (error) {
			console.error("Error deploying to production:", error)
			throw error
		}
	}
}
