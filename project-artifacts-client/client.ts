import { PROJECT_ARTIFACTS_ENDPOINT } from "./config"
import { ArtifactsDTO } from "./types"

export class ProjectArtifactsClient {

    private readonly endpoint: string
    
    constructor() {
        this.endpoint = PROJECT_ARTIFACTS_ENDPOINT
    }

    async initializeProjectHistory(): Promise<string> {
		try {
			const response = await fetch(`${this.endpoint}/initialize-project-history`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				}
			})

			if (!response.ok) {
				throw new Error(`Failed to initialize project history: ${response.statusText}`)
			}

			return await response.json() as string
		} catch (error) {
			console.error("Error initializing project history:", error)
			throw error
		}
	}

    async saveArtifacts(artifacts: ArtifactsDTO): Promise<void> {
		try {
			const response = await fetch(`${this.endpoint}/save-artifacts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
                body: JSON.stringify(artifacts)
			})

			if (!response.ok) {
				throw new Error(`Failed to save artifacts: ${response.statusText}`)
			}
		} catch (error) {
			console.error("Error saving artifacts:", error)
			throw error
		}
	}

    async fetchArtifacts(projectHistoryId: string): Promise<ArtifactsDTO> {

		try {
			const response = await fetch(`${this.endpoint}/fetch-artifacts/${projectHistoryId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (!response.ok) {
				throw new Error(`Failed to fetch artifacts: ${response.statusText}`)
			}

			return await response.json() as ArtifactsDTO
		} catch (error) {
			console.error("Error fetching artifacts:", error)
			throw error
		}
	}
}