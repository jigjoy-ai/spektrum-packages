import { ActivityType, Task } from "@jigjoy-ai/task-contracts"
import { ProjectNotFoundError } from "./types"
import type { AxiosInstance } from "@jigjoy-ai/http-client"

export class ProjectPlanningClient {

	constructor(private readonly api: AxiosInstance) {
	}

	async createNewProject(owner: string): Promise<any> {
		try {
			const requestBody = {
				owner: owner,
			}
			const response = await this.api.post(`/planning/project`, requestBody)
			return response.data
		} catch (error) {
			console.error("Error creating project:", error)
			throw error
		}
	}

	async updateProjectDetails(id: string, name: string, description: string): Promise<any> {
		try {
			const requestBody = {
				id: id,
				name: name,
				description: description,
			}
			const response = await this.api.put(`/planning/project`, requestBody)
			return response.data
		} catch (error) {
			console.error("Error updating project details:", error)
			throw error
		}
	}

	async fetchProject(id: string): Promise<any> {
		try {
			const response = await this.api.get(`/planning/project/fetch/${id}`)
			return response.data
		} catch (error: any) {
			if (error.response?.status === 404) {
				throw new ProjectNotFoundError()
			}
			console.error("Error fetching project:", error)
			throw error
		}
	}

	async fetchAllProjects(owner: string): Promise<any> {
		try {
			const response = await this.api.get(`/planning/project/fetch-all/${owner}`)
			return response.data
		} catch (error) {
			console.error("Error fetching all projects:", error)
			throw error
		}
	}

	async archiveProject(projectId: string): Promise<any> {
		try {
			const requestBody = {
				projectId: projectId,
			}
			const response = await this.api.put(`/planning/project/archive`, requestBody)
			return response.data
		} catch (error) {
			console.error("Error archiving project:", error)
			throw error
		}
	}

	async createTask(projectId: string, title: string, description: string): Promise<Task> {
		try {
			const requestBody = {
				projectId: projectId,
				title: title,
				description: description,
			}
			const response = await this.api.post(`/planning/task`, requestBody)
			return response.data as Task
		} catch (error) {
			console.error("Error creating task:", error)
			throw error
		}
	}

	async updateTaskTitle(task: Task): Promise<Task> {
		try {
			const response = await this.api.put(`/planning/task/title`, task)
			return response.data as Task
		} catch (error) {
			console.error("Error updating task title:", error)
			throw error
		}
	}

	async updateTaskDescription(task: Task): Promise<Task> {
		try {
			const response = await this.api.put(`/planning/task/description`, task)
			return response.data as Task
		} catch (error) {
			console.error("Error updating task description:", error)
			throw error
		}
	}

	async fetchAllTasks(projectId: string): Promise<Task[]> {
		try {
			const response = await this.api.get(`/planning/task/fetch-all/${projectId}`)
			return response.data as Task[]
		} catch (error) {
			console.error("Error fetching all tasks:", error)
			throw error
		}
	}

	async planTasksWithAI(projectId: string, projectDescription: string): Promise<Task[]> {
		try {
			const requestBody = {
				projectId: projectId,
				projectDescription: projectDescription,
			}
			const response = await this.api.post(`/planning/task/plan-tasks`, requestBody)
			return response.data as Task[]
		} catch (error) {
			console.error("Error planning tasks with AI:", error)
			throw error
		}
	}

	async recordWork(taskId: string, workerId: string, message: string, type: ActivityType.STARTED_WORK | ActivityType.FINISHED_WORK ): Promise<Task> {
		try {

			const requestBody = {
				taskId: taskId,
				workerId: workerId,
				message: message,
				type: type,
			}
			const response = await this.api.post(`/planning/task/record-work`, requestBody)
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
			const response = await this.api.post(`/planning/task/leave-comment`, requestBody)
			return response.data as Task
		} catch (error) {
			console.error("Error leaving comment:", error)
			throw error
		}
	}
}
