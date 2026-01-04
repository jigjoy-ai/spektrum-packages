import { Storage } from "../storage/storage"

export abstract class StorageFactory {
	abstract create(): Storage
}
