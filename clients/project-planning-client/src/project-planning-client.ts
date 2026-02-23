import { ActivityType, Task } from "@jigjoy-ai/task-contracts"
import { ProjectNotFoundError } from "./types"
import type { AxiosInstance } from "@jigjoy-ai/http-client"
import { UserData } from "@jigjoy-ai/auth"
import { authDataHeaders } from "@heksagon/http"
import { Auth } from "@heksagon/app"

export class ProjectPlanningClient {
	constructor(private readonly api: AxiosInstance) {}

	async createNewProject(auth?: Auth<UserData>): Promise<any> {
		try {
			const response = await this.api.post(`/planning/project`, 
				{ headers: auth ? authDataHeaders(auth) : {} })
			return response.data
		} catch (error) {
			console.error("Error creating project:", error)
			throw error
		}
	}

	async updateProjectDetails(id: string, name: string, description: string, auth?: Auth<UserData>): Promise<any> {
		try {
			const requestBody = {
				id: id,
				name: name,
				description: description,
			}
			const response = await this.api.put(`/planning/project`, requestBody, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data
		} catch (error) {
			console.error("Error updating project details:", error)
			throw error
		}
	}

	async fetchProject(id: string, auth?: Auth<UserData>): Promise<any> {
		try {
			const response = await this.api.get(`/planning/project/fetch/${id}`, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data
		} catch (error: any) {
			if (error.response?.status === 404) {
				throw new ProjectNotFoundError()
			}
			console.error("Error fetching project:", error)
			throw error
		}
	}

	async fetchAllProjects(auth?: Auth<UserData>): Promise<any> {
		try {
			const response = await this.api.get(`/planning/project/all`, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data
		} catch (error) {
			console.error("Error fetching all projects:", error)
			throw error
		}
	}

	async archiveProject(projectId: string, auth?: Auth<UserData>): Promise<any> {
		try {
			const requestBody = {
				projectId: projectId,
			}
			const response = await this.api.put(`/planning/project/archive`, requestBody, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data
		} catch (error) {
			console.error("Error archiving project:", error)
			throw error
		}
	}

	async createTask(projectId: string, title: string, description: string, auth?: Auth<UserData>): Promise<Task> {
		try {
			const requestBody = {
				projectId: projectId,
				title: title,
				description: description,
			}
			const response = await this.api.post(`/planning/task`, requestBody, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task
		} catch (error) {
			console.error("Error creating task:", error)
			throw error
		}
	}

	async updateTaskTitle(task: Task, auth?: Auth<UserData>): Promise<Task> {
		try {
			const response = await this.api.put(`/planning/task/title`, task, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task
		} catch (error) {
			console.error("Error updating task title:", error)
			throw error
		}
	}

	async updateTaskDescription(task: Task, auth?: Auth<UserData>): Promise<Task> {
		try {
			const response = await this.api.put(`/planning/task/description`, task, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task
		} catch (error) {
			console.error("Error updating task description:", error)
			throw error
		}
	}

	async fetchAllTasks(projectId: string, auth?: Auth<UserData>): Promise<Task[]> {
		try {
			const response = await this.api.get(`/planning/task/fetch-all/${projectId}`, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task[]
		} catch (error) {
			console.error("Error fetching all tasks:", error)
			throw error
		}
	}

	async planTasksWithAI(projectId: string, projectDescription: string, auth?: Auth<UserData>): Promise<Task[]> {
		try {
			const requestBody = {
				projectId: projectId,
				projectDescription: projectDescription,
			}
			const response = await this.api.post(`/planning/task/plan-tasks`, requestBody, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task[]
		} catch (error) {
			console.error("Error planning tasks with AI:", error)
			throw error
		}
	}

	async recordWork(
		taskId: string,
		workerId: string,
		message: string,
		type: ActivityType.STARTED_WORK | ActivityType.FINISHED_WORK,
		auth?: Auth<UserData>
	): Promise<Task> {
		try {
			const requestBody = {
				taskId: taskId,
				workerId: workerId,
				message: message,
				type: type,
			}
			const response = await this.api.post(`/planning/task/record-work`, requestBody, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task
		} catch (error) {
			console.error("Error recording work:", error)
			throw error
		}
	}

	async leaveComment(taskId: string, commentText: string, authorName: string, auth?: Auth<UserData>): Promise<Task> {
		try {
			const requestBody = {
				taskId: taskId,
				commentText: commentText,
				authorName: authorName,
			}
			const response = await this.api.post(`/planning/task/leave-comment`, requestBody, { headers: auth ? authDataHeaders(auth) : {} })
			return response.data as Task
		} catch (error) {
			console.error("Error leaving comment:", error)
			throw error
		}
	}
}
