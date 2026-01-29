import { AccountAndBillingClient } from "@jigjoy-io/account-and-billing-client"
import { ProjectPlanningClient } from "@jigjoy-io/project-planning-client"
import { ProjectDeploymentClient } from "@jigjoy-io/project-deployment-client"
import { ObservabilityClient } from "@jigjoy-io/observability-client"
import { AICodingClient } from "@jigjoy-io/ai-coding-client"

export class PlatformSDK {

	planning: ProjectPlanningClient
  	account: AccountAndBillingClient
  	observability: ObservabilityClient
  	deployment: ProjectDeploymentClient
  	ai: AICodingClient

	constructor(endpoint: string) {
		this.planning = new ProjectPlanningClient(endpoint)
		this.account = new AccountAndBillingClient(endpoint)
		this.observability = new ObservabilityClient(endpoint)
		this.deployment = new ProjectDeploymentClient(endpoint)
		this.ai = new AICodingClient(endpoint)
	}


}
