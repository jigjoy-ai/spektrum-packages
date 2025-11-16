export type FileArtifacts = {
    [filePath: string]: string
}

export type ArtifactDTO = { 
	repositoryId: string, 
	buildArtifacts: FileArtifacts, 
	sourceCodeArtifacts: FileArtifacts
}