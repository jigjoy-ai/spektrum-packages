import { S3ArtifactsStorage } from "./adapters/s3-artifacts-storage"
import { S3FileStorage } from "./adapters/s3-file-storage"
import { TarGzCompressorService } from "./adapters/targz-compressor-service"
import { FileArtifactsStorage } from "./ports/file-artifacts-storage"

export class ArtifactStorageProvider {
    static create(): FileArtifactsStorage {
        return new S3ArtifactsStorage(new S3FileStorage(), new TarGzCompressorService())
    }
}