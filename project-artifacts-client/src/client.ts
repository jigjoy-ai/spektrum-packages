
import { ArtifactDTO } from "@jigjoy-io/types"
import { PROJECT_ARTIFACTS_ENDPOINT } from "./config"

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

    async saveArtifact(artifact: ArtifactDTO): Promise<void> {
		try {
			const response = await fetch(`${this.endpoint}/save-artifact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
                body: JSON.stringify(artifact)
			})

			if (!response.ok) {
				throw new Error(`Failed to save artifact: ${response.statusText}`)
			}
		} catch (error) {
			console.error("Error saving artifact:", error)
			throw error
		}
	}

    async fetchArtifact(projectHistoryId: string): Promise<ArtifactDTO> {

		try {
			const response = await fetch(`${this.endpoint}/fetch-artifact/${projectHistoryId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (!response.ok) {
				throw new Error(`Failed to fetch artifact: ${response.statusText}`)
			}

			return await response.json() as ArtifactDTO
		} catch (error) {
			console.error("Error fetching artifact:", error)
			throw error
		}
	}
}