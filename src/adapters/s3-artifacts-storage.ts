import { FileArtifacts } from "../file-artifacts"
import { CompressorService } from "../ports/compressor-service"
import { FileArtifactsStorage } from "../ports/file-artifacts-storage"
import { FileStorage } from "../ports/file-storage"
import { Readable } from "stream"
import { v4 as uuidv4 } from 'uuid'

export class S3ArtifactsStorage implements FileArtifactsStorage {
    
    constructor(private readonly fileStorage: FileStorage, private readonly compressorService: CompressorService) {}
    
    async upload(bucket: string, folder: string, fileArtifacts: FileArtifacts): Promise<string> {

		const artefactId = uuidv4()
		const archivePath = `${folder}/${artefactId}.tar.gz`
		const archive = await this.compressorService.compress(fileArtifacts)
		const stream = Readable.from(archive)

		await this.fileStorage.upload(bucket, archivePath, stream)

		return archivePath
    }

    async download(bucket: string, archivePath: string): Promise<FileArtifacts> {
        const buffer = await this.fileStorage.download(bucket, archivePath)
		return this.compressorService.decompress(buffer)
    }
}