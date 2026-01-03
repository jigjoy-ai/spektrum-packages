export enum ActivityType {
    COMMENT_LEFT = "COMMENT_LEFT",
    DESCRIPTION_UPDATED = "DESCRIPTION_UPDATED",
    FINISHED_WORK = "FINISHED_WORK",
	STARTED_WORK = "STARTED_WORK",
	TASK_CREATED = "TASK_CREATED",
	TITLE_UPDATED = "TITLE_UPDATED"
}

export type CommentLeftMetadata = {
    authorId: string
    commentText: string
}

export type CommentLeftActivityDTO = {
    id: string
    type: ActivityType.COMMENT_LEFT
    projectId: string
    taskId: string
    userId: string
    occurredAt: string 
    metadata: CommentLeftMetadata
}

export type DescriptionUpdatedMetadata = {
	message: string
	oldDescription: string
	newDescription: string
}

export type DescriptionUpdatedActivityDTO = {
    id: string
    type: ActivityType.DESCRIPTION_UPDATED
    projectId: string
    taskId: string
    userId: string
    occurredAt: string
    metadata: DescriptionUpdatedMetadata
}

export type FinishedWorkMetadata = {
    workerId: string
    message: string
}
  
export type FinishedWorkActivityDTO = {
    id: string
    type: ActivityType.FINISHED_WORK
    projectId: string
    taskId: string
    userId: string
    occurredAt: string
    metadata: FinishedWorkMetadata
}

export type StartedWorkMetadata = {
    workerId: string
    message: string
}

export type StartedWorkActivityDTO = {
    id: string
    type: ActivityType.STARTED_WORK
    projectId: string
    taskId: string
    userId: string
    occurredAt: string
    metadata: StartedWorkMetadata
}

export type TaskCreatedMetadata = {
	message: string
	title: string
	description: string
}

export type TaskCreatedActivityDTO = {
    id: string
    type: ActivityType.TASK_CREATED
    projectId: string
    taskId: string
    userId: string
    occurredAt: string
    metadata: TaskCreatedMetadata
}

export type TitleUpdatedMetadata = {
	message: string
	oldTitle: string
	newTitle: string
}

export type TitleUpdatedActivityDTO = {
    id: string
    type: ActivityType.TITLE_UPDATED
    projectId: string
    taskId: string
    userId: string
    occurredAt: string
    metadata: TitleUpdatedMetadata
}

export type ActivityMetadata = 
    | CommentLeftMetadata 
    | DescriptionUpdatedMetadata 
    | FinishedWorkMetadata 
    | StartedWorkMetadata 
    | TaskCreatedMetadata 
    | TitleUpdatedMetadata

export type ActivityDTO =
    | CommentLeftActivityDTO
    | DescriptionUpdatedActivityDTO
    | FinishedWorkActivityDTO
    | StartedWorkActivityDTO
    | TaskCreatedActivityDTO
    | TitleUpdatedActivityDTO
  