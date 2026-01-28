import { Task } from "@jigjoy-io/task-contracts"
import axios from "axios"

export enum ModuleType {
	FRONTEND = "FRONTEND",
}

export type Module = {
	id: string
	repositoryId: string
	type: ModuleType
}

export class AICodingClient {
	private readonly endpoint: string

	constructor(endpoint: string) {
		this.endpoint = endpoint
	}

	async initalizeModule(projectId: string): Promise<Module> {
		try {
			const requestBody = {
				projectId: projectId,
			}

			const response = await axios.post(`${this.endpoint}/ai/module/initalization`, requestBody)

			return response.data
		} catch (error) {
			console.error("Error initializing react module:", error)
			throw error
		}
	}

	async developModule(task: Task, accountId: string): Promise<void> {
		try {
			const response = await axios.post(`${this.endpoint}/ai/module/development`, { task: task, accountId: accountId })

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

			const response = await axios.post(`${this.endpoint}/ai/module/deployment`, requestBody)

			return response.data
		} catch (error) {
			console.error("Error deploying to production:", error)
			throw error
		}
	}
}
