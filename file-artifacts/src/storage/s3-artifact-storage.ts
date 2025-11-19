
import { S3Adapter } from "../adapters/s3"
import { CompressorService } from "../ports/compressor-service"
import { FileArtifactsStorage } from "./file-artifacts-storage"

export class S3ArtifactsStorage extends FileArtifactsStorage {


    constructor(readonly s3: S3Adapter, compressor: CompressorService) {
        super(compressor)
    }

    async writeFile(path: any, content: any): Promise<void> {
        this.s3.upload(path, content)
    }

    async readFile(path: any): Promise<Buffer> {
        return this.s3.download(path)
    }

}