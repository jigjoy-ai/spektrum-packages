import { Heatmap, Pagination, TaskExecution, TimeRange } from "./types"
import type { AxiosInstance } from "@jigjoy-ai/http-client"

export class ObservabilityClient {
	constructor(private readonly api: AxiosInstance) {}

	async taskExecutionStarted(title: string, projectId: string, taskId: string): Promise<TaskExecution> {
		try {
			const taskExecution = {
				title: title,
				projectId: projectId,
				taskId: taskId,
			}
			const response = await this.api.post(`/observability/task-execution/started`, taskExecution)
			return response.data as TaskExecution
		} catch (error) {
			console.error("Error starting task execution:", error)
			throw error
		}
	}

	async taskExecutionSucceeded(taskExecutionId: string): Promise<void> {
		try {
			await this.api.post(`/observability/task-execution/finished`, { taskExecutionId: taskExecutionId })
		} catch (error) {
			console.error("Error succeeded task execution:", error)
			throw error
		}
	}

	async taskExecutionFailed(taskExecutionId: string, error: string): Promise<void> {
		try {
			await this.api.post(`/observability/task-execution/finished-with-error`, {
				taskExecutionId: taskExecutionId,
				error: error,
			})
		} catch (error) {
			console.error("Error failed task execution:", error)
			throw error
		}
	}

	async getAllExecutions(pagination: Pagination): Promise<TaskExecution[]> {
		try {
			const params = {
				page: pagination.pageNumber,
				size: pagination.pageSize,
			}
			const response = await this.api.get(`/observability/task-executions`, {
				params: params,
			})

			return response.data as TaskExecution[]
		} catch (error) {
			console.error("Error getting account executions:", error)
			throw error
		}
	}

	async getProjectExecutions(projectId: string, pagination: Pagination): Promise<TaskExecution[]> {
		try {
			const params = {
				page: pagination.pageNumber,
				size: pagination.pageSize,
			}
			const response = await this.api.get(`/observability/task-execution/project/${projectId}`, {
				params: params,
			})

			return response.data as TaskExecution[]
		} catch (error) {
			console.error("Error getting account executions:", error)
			throw error
		}
	}

	async getHeatmap(timeRange: TimeRange): Promise<Heatmap[]> {
		try {
			const params = {
				startDate: timeRange.startDate,
				endDate: timeRange.endDate,
			}
			const response = await this.api.get(`/observability/task-execution/heatmap`, {
				params: params,
			})
			return response.data as Heatmap[]
		} catch (error) {
			console.error("Error getting heatmap:", error)
			throw error
		}
	}
}
