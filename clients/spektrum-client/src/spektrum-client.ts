import {
	createGatewayApi,
	authStoreBrowser,
	creds,
	type CredentialsProvider,
  } from "@jigjoy-ai/http-client"
  
import { AccountAndBillingClient } from "@jigjoy-ai/account-and-billing-client"
import { ProjectPlanningClient } from "@jigjoy-ai/project-planning-client"
import { ProjectDeploymentClient } from "@jigjoy-ai/project-deployment-client"
import { ObservabilityClient } from "@jigjoy-ai/observability-client"
import { AICodingClient } from "@jigjoy-ai/ai-coding-client"
import { ProjectVersioningClient } from "@jigjoy-ai/project-versioning-client"

type SpektrumClientMode =
	| { kind: "public" } // browser user (Bearer from authStoreBrowser)
	| { kind: "internal"; token: string } // service-to-service
  
export class SpektrumClient {
	planning: ProjectPlanningClient
	account: AccountAndBillingClient
	observability: ObservabilityClient
	deployment: ProjectDeploymentClient
	ai: AICodingClient
	versioning: ProjectVersioningClient
  
	constructor(endpoint: string, mode: SpektrumClientMode = { kind: "public" }) {
		const getCredentials: CredentialsProvider =
			mode.kind === "internal"
			? () => creds.internal(mode.token)
			: authStoreBrowser.getCredentials
	
		const api = createGatewayApi(endpoint, getCredentials)
	
		this.planning = new ProjectPlanningClient(api)
		this.account = new AccountAndBillingClient(api)
		this.observability = new ObservabilityClient(api)
		this.deployment = new ProjectDeploymentClient(api)
		this.ai = new AICodingClient(api)
		this.versioning = new ProjectVersioningClient(api)
	}
  }
  