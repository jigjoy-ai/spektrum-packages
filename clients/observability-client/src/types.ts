export type Pagination = {
	pageNumber: number
	pageSize: number
}

export const DefaultPagination: Pagination = {
	pageNumber: 1,
	pageSize: 5,
}

export type Heatmap = {
	date: string
	runCount: number
}

export type TimeRange = {
	startDate: string
	endDate: string
}

export enum TaskExecutionStatus {
    RUNNING = 'Running',
    SUCCEEDED = 'Succeeded',
    FAILED = 'Failed'
}

export type TaskExecution = {
	id: string
	title: string
	projectId: string
	taskId: string
	accountId: string
	status: TaskExecutionStatus
	occurredAt: string
	error?: string
}