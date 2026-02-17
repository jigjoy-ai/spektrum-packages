import type { AxiosInstance } from "@jigjoy-ai/http-client"

export enum EnvironmentType {
	DEV = "DEV",
	PROD = "PROD",
}

export enum ModuleType {
	FRONTEND = "FRONTEND",
}

export type DeployModuleCommand = {
	projectId: string
	moduleId: string
	moduleType: ModuleType
	versionControlId: string
	environmentType: EnvironmentType
	setAsEntryPoint?: boolean
}

export type EntryPoint = {
	moduleId: string
	assetBaseUrl: string
	publicAppUrl: string
}

export class ProjectDeploymentClient {

	constructor(private readonly api: AxiosInstance) {}

	async createCloudProfile(projectId: string): Promise<void> {
		try {
			const payload = {
				projectId: projectId,
			}

			await this.api.post(`/deployment/project-cloud-profile`, payload)
		} catch (error) {
			console.error("Error creating cloud profile:", error)
			throw error
		}
	}

	async deployModule(deployModuleCommand: DeployModuleCommand): Promise<EntryPoint> {
		try {
			const response = await this.api.post(`/deployment/module`, deployModuleCommand)

			return response.data as EntryPoint
		} catch (error) {
			console.error("Error during deploying module:", error)
			throw error
		}
	}

	async getEntryPoint(projectId: string, environment: EnvironmentType): Promise<EntryPoint> {
		try {
			const environmentKey = EnvironmentType[environment] as string

			const response = await this.api.get(
				`/deployment/projects/${projectId}/environments/${environmentKey}/entry-point`,
			)

			return response.data as EntryPoint
		} catch (error) {
			console.error("Error getting entry point:", error)
			throw error
		}
	}
}
