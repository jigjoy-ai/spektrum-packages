import { FileArtifacts } from "./file-artifacts"

export type ArtifactDTO = { 
	repositoryId: string, 
	buildArtifacts: FileArtifacts, 
	sourceCodeArtifacts: FileArtifacts
}