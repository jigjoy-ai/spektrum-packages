import { ActivityDTO } from "./activity"

export enum TaskStatus {
	TODO = "Todo",
	WORK_IN_PROGRESS = "Work in progress",
	DONE = "Done",
}

export type TaskDTO = {
	id: string
	title: string
	description: string
	projectId: string
	created: string
	updated: string | null
	status: TaskStatus
	activities: ActivityDTO[]
}