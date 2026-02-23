import { Auth } from "@heksagon/app"
import { Heatmap, Pagination, TaskExecution, TimeRange } from "./types"
import type { AxiosInstance } from "@jigjoy-ai/http-client"
import { UserData } from "@jigjoy-ai/auth"
import { authDataHeaders } from "@heksagon/http"

export class ObservabilityClient {
	constructor(private readonly api: AxiosInstance) {}

	async taskExecutionStarted(title: string, projectId: string, taskId: string, auth?: Auth<UserData>): Promise<TaskExecution> {
		try {
			const taskExecution = {
				title: title,
				projectId: projectId,
				taskId: taskId,
			}
			const response = await this.api.post(
				`/observability/task-execution/started`, 
				taskExecution, 
				{ headers: auth ? authDataHeaders(auth) : {} }
			)
			return response.data as TaskExecution
		} catch (error) {
			console.error("Error starting task execution:", error)
			throw error
		}
	}

	async taskExecutionSucceeded(taskExecutionId: string, auth?: Auth<UserData>): Promise<void> {
		try {
			await this.api.post(
				`/observability/task-execution/finished`, 
				{ taskExecutionId: taskExecutionId }, 
				{ headers: auth ? authDataHeaders(auth) : {} }
			)
		} catch (error) {
			console.error("Error succeeded task execution:", error)
			throw error
		}
	}

	async taskExecutionFailed(taskExecutionId: string, error: string, auth?: Auth<UserData>): Promise<void> {
		try {
			await this.api.post(
				`/observability/task-execution/finished-with-error`, 
				{ taskExecutionId: taskExecutionId, error: error }, 
				{ headers: auth ? authDataHeaders(auth) : {} }
			)
		} catch (error) {
			console.error("Error failed task execution:", error)
			throw error
		}
	}

	async getAllExecutions(pagination: Pagination, auth?: Auth<UserData>): Promise<TaskExecution[]> {
		try {
			const params = {
				page: pagination.pageNumber,
				size: pagination.pageSize,
			}
			const response = await this.api.get(`/observability/task-execution/all`, {
				params: params,
				headers: auth ? authDataHeaders(auth) : {}
			})

			return response.data as TaskExecution[]
		} catch (error) {
			console.error("Error getting account executions:", error)
			throw error
		}
	}

	async getProjectExecutions(projectId: string, pagination: Pagination, auth?: Auth<UserData>): Promise<TaskExecution[]> {
		try {
			const params = {
				page: pagination.pageNumber,
				size: pagination.pageSize,
			}
			const response = await this.api.get(`/observability/task-execution/project/${projectId}`, {
				params: params,
				headers: auth ? authDataHeaders(auth) : {}
			})
			return response.data as TaskExecution[]
		} catch (error) {
			console.error("Error getting account executions:", error)
			throw error
		}
	}

	async getHeatmap(timeRange: TimeRange, auth?: Auth<UserData>): Promise<Heatmap[]> {
		try {
			const params = {
				startDate: timeRange.startDate,
				endDate: timeRange.endDate,
			}
			const response = await this.api.get(`/observability/task-execution/heatmap`, {
				params: params,
				headers: auth ? authDataHeaders(auth) : {}
			})
			return response.data as Heatmap[]
		} catch (error) {
			console.error("Error getting heatmap:", error)
			throw error
		}
	}
}
