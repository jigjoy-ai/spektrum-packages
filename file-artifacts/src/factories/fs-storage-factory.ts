import { LocalFileSystem } from "../adapters/local-file-system"
import { TarGzCompressorService } from "../adapters/targz-compressor-service"
import { Storage } from "../storage/storage"
import { FileSystemArtifactsStorage } from "../storage/fs-artifact-storage"
import { StorageFactory } from "./storage-factory"

export class FileSystemStorageFactory extends StorageFactory {
	create(): Storage {
		const compressor = new TarGzCompressorService()
		const fs = new LocalFileSystem()
		return new FileSystemArtifactsStorage(fs, compressor)
	}
}
