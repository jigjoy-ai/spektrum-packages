import { ActivityType, Task } from "@jigjoy-io/task-contracts"
import axios from "axios"

export class ProjectPlanningClient {
	private readonly endpoint: string

	constructor(endpoint: string) {
		this.endpoint = endpoint
	}

	async recordWork(taskId: string, workerId: string, message: string, type: ActivityType.STARTED_WORK | ActivityType.FINISHED_WORK ): Promise<Task> {
		try {

			const requestBody = {
				taskId: taskId,
				workerId: workerId,
				message: message,
				type: type,
			}
			const response = await axios.post(`${this.endpoint}/task/record-work`, requestBody)
			return response.data as Task
		} catch (error) {
			console.error("Error recording work:", error)
			throw error
		}
	}

	async leaveComment(taskId: string, commentText: string, authorId: string): Promise<Task> {
		try {
			const requestBody = {
				taskId: taskId,
				commentText: commentText,
				authorId: authorId,
			}
			const response = await axios.post(`${this.endpoint}/task/leave-comment`, requestBody)
			return response.data as Task
		} catch (error) {
			console.error("Error leaving comment:", error)
			throw error
		}
	}
}
