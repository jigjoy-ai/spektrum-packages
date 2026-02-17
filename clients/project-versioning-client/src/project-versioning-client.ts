import type { AxiosInstance } from "@jigjoy-ai/http-client"

type FileArtifacts = {
	[filePath: string]: string
}

type VersionDTO = {
	projectHistoryId: string
	buildArtifacts: FileArtifacts
	sourceCodeArtifacts: FileArtifacts
}

export class ProjectVersioningClient {

	constructor(private readonly api: AxiosInstance) {
	}

	async initializeProjectHistory(): Promise<string> {
		try {
			const res = await this.api.post(`/versioning/project-history`, {})
			return res.data
		} catch (error) {
			console.error("Error initializing project history:", error)
			throw error
		}
	}

	async saveVersion(version: VersionDTO): Promise<void> {
		try {
			const payload = JSON.parse(JSON.stringify(version))

			await this.api.post(`/versioning/project-history/${version.projectHistoryId}/versions`, payload)
		} catch (error) {
			console.error("Error saving version:", error)
			throw error
		}
	}

	async getLatestVersion(projectHistoryId: string): Promise<VersionDTO> {
		try {
			const res = await this.api.get<VersionDTO>(`/versioning/project-history/${projectHistoryId}/versions/latest`)

			return res.data
		} catch (error: any) {
			console.error("Error fetching latest version:", error)
			throw error
		}
	}
}
