import axios from "axios"
import { Heatmap, Pagination, TaskExecution, TimeRange } from "./types"

export class ObservabilityClient {
	private readonly endpoint: string

	constructor(endpoint: string) {
		this.endpoint = endpoint
	}

	async startTaskExecution(title: string, projectId: string, taskId: string, accountId: string): Promise<void> {
		try {

			const taskExecution = {
				title: title,
				projectId: projectId,
				taskId: taskId,
				accountId: accountId,
			}
			await axios.post(`${this.endpoint}/task-execution/start`, taskExecution)
		} catch (error) {
			console.error("Error starting task execution:", error)
			throw error
		}
	}

	async getAccountExecutions(accountId: string, pagination: Pagination): Promise<TaskExecution[]> {
		try {
			const url = new URL(`${this.endpoint}/task-execution/account/${accountId}`)
			url.searchParams.append("page", String(pagination.pageNumber))
			url.searchParams.append("size", String(pagination.pageSize))
			const response = await axios.get(url.toString())

			return response.data as TaskExecution[]
		} catch (error) {
			console.error("Error getting account executions:", error)
			throw error
		}
	}

	async getProjectExecutions(projectId: string, pagination: Pagination): Promise<TaskExecution[]> {
		try {
			const url = new URL(`${this.endpoint}/task-execution/project/${projectId}`)
			url.searchParams.append("page", String(pagination.pageNumber))
			url.searchParams.append("size", String(pagination.pageSize))
			const response = await axios.get(url.toString())

			return response.data as TaskExecution[]
		} catch (error) {
			console.error("Error getting account executions:", error)
			throw error
		}
	}

	async getHeatmap(accountId: string, timeRange: TimeRange): Promise<Heatmap[]> {
		try {

			const url = new URL(`${this.endpoint}/task-execution/heatmap/account/${accountId}`)
			url.searchParams.append("startDate", timeRange.startDate)
			url.searchParams.append("endDate", timeRange.endDate)
			const response = await axios.get(url.toString())
			return response.data as Heatmap[]
		} catch (error) {
			console.error("Error getting heatmap:", error)
			throw error
		}
	}


}
