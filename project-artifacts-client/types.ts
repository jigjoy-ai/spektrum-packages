export type FileArtifacts = {
    [filePath: string]: string
}

export type ArtifactsDTO = { 
	repositoryId: string, 
	buildArtifacts: FileArtifacts, 
	sourceCodeArtifacts: FileArtifacts
}