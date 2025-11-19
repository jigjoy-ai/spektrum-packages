import { S3Adapter } from "../adapters/s3"
import { TarGzCompressorService } from "../adapters/targz-compressor-service"
import { CompressorService } from "../ports/compressor-service"
import { S3ArtifactsStorage } from "../storage/s3-artifact-storage"
import { StorageFactory } from "./storage-factory"
import { Storage } from "../storage/storage" 

export class S3StorageFactory extends StorageFactory {

    constructor(readonly bucket: string){
        super()
    }

    create(): Storage {
        const compressor: CompressorService = new TarGzCompressorService()
        const s3 = new S3Adapter(this.bucket)
        return new S3ArtifactsStorage(s3, compressor)
    }
}