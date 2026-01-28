import axios from "axios"
import { Heatmap, Pagination, TaskExecution, TimeRange } from "./types"

export class ObservabilityClient {
	private readonly endpoint: string

	constructor(endpoint: string) {
		this.endpoint = endpoint
	}

	async taskExecutionStarted(title: string, projectId: string, taskId: string, accountId: string): Promise<TaskExecution> {
		try {

			const taskExecution = {
				title: title,
				projectId: projectId,
				taskId: taskId,
				accountId: accountId,
			}
			const response = await axios.post(`${this.endpoint}/observability/task-execution/started`, taskExecution)
			return response.data as TaskExecution
		} catch (error) {
			console.error("Error starting task execution:", error)
			throw error
		}
	}

	async taskExecutionSucceeded(taskExecutionId: string): Promise<void> {
		try {
			await axios.post(`${this.endpoint}/observability/task-execution/finished`, { taskExecutionId: taskExecutionId })
		} catch (error) {
			console.error("Error succeeded task execution:", error)
			throw error
		}
	}

	async taskExecutionFailed(taskExecutionId: string, error: string): Promise<void> {
		try {
			await axios.post(`${this.endpoint}/observability/task-execution/finished-with-error`, { taskExecutionId: taskExecutionId, error: error })
		} catch (error) {
			console.error("Error failed task execution:", error)
			throw error
		}
	}

	async getAccountExecutions(accountId: string, pagination: Pagination): Promise<TaskExecution[]> {
		try {
			const url = new URL(`${this.endpoint}/observability/task-execution/account/${accountId}`)
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
			const url = new URL(`${this.endpoint}/observability/task-execution/project/${projectId}`)
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

			const url = new URL(`${this.endpoint}/observability/task-execution/heatmap/account/${accountId}`)
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
