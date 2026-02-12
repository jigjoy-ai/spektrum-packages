import { AccountAndBillingClient } from "@jigjoy-ai/account-and-billing-client"
import { ProjectPlanningClient } from "@jigjoy-ai/project-planning-client"
import { ProjectDeploymentClient } from "@jigjoy-ai/project-deployment-client"
import { ObservabilityClient } from "@jigjoy-ai/observability-client"
import { AICodingClient } from "@jigjoy-ai/ai-coding-client"
import { ProjectVersioningClient } from "@jigjoy-ai/project-versioning-client"

export class PlatformSDK {

	planning: ProjectPlanningClient
  	account: AccountAndBillingClient
  	observability: ObservabilityClient
  	deployment: ProjectDeploymentClient
  	ai: AICodingClient
	versioning: ProjectVersioningClient

	constructor(endpoint: string) {
		this.planning = new ProjectPlanningClient(endpoint)
		this.account = new AccountAndBillingClient(endpoint)
		this.observability = new ObservabilityClient(endpoint)
		this.deployment = new ProjectDeploymentClient(endpoint)
		this.ai = new AICodingClient(endpoint)
		this.versioning = new ProjectVersioningClient(endpoint)
	}


}
