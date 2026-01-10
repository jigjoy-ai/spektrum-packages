import axios from "axios"

export class ProjectPlanningClient {
	private readonly endpoint: string

	constructor(endpoint: string) {
		this.endpoint = endpoint
	}
}
