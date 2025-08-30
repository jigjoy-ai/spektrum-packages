import { S3FileStorage } from "./adapters/s3-file-storage"
import { FileStorage } from "./ports/file-storage"

export class FileStorageProvider {
    static create(): FileStorage {
        return new S3FileStorage()
    }
}