import { FileArtifacts } from "../file-artifacts"
import { CompressorService } from "../ports/compressor-service"
import { FileArtifactsStorage } from "../ports/file-artifacts-storage"
import { FileStorage } from "../ports/file-storage"
import { Readable } from "stream"

export class S3ArtifactsStorage implements FileArtifactsStorage {
    
    constructor(private readonly fileStorage: FileStorage, private readonly compressorService: CompressorService) {}
    
    async upload(bucket: string, path: string, fileArtifacts: FileArtifacts): Promise<void> {
		const archive = await this.compressorService.compress(fileArtifacts)
		const stream = Readable.from(archive)

		await this.fileStorage.upload(bucket, path, stream)
    }

    async download(bucket: string, archivePath: string): Promise<FileArtifacts> {
        const buffer = await this.fileStorage.download(bucket, archivePath)
		return this.compressorService.decompress(buffer)
    }
}