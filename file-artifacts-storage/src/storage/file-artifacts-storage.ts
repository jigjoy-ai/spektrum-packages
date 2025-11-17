import { FileArtifacts } from "@jigjoy-io/types"
import { CompressorService } from "../ports/compressor-service"
import { v4 as uuidV4 } from 'uuid'

export abstract class FileArtifactsStorage {

    constructor(readonly compressor: CompressorService){}

    abstract writeFile(path, content): Promise<void>

    abstract readFile(path): Promise<Buffer>

    /**
     * Writes all file artifacts as individual files in the storage.
     *
     * @param folderName - The logical folder / namespace where the files will be stored.
     * @param artifacts - A collection of virtual files where each key is a file path and value is its content.
     *
     * @returns A promise that resolves once all files have been successfully written.
     */
    async writeAll(folderName: string, artifacts: FileArtifacts): Promise<void> {

		const promises: any = []
		for (const [fileName, content] of Object.entries(artifacts)) {
	
			const path = `${folderName}/${fileName}`.replace(/\\/g, '/')
	
			const promise = this.writeFile(path, content)
		
			promises.push(promise)
		}
	
		await Promise.all(promises)
    }


    /**
     * Creates a tar.gz archive from the provided file artifacts and writes it as a single object.
     *
     * @param folderName - The logical folder / namespace where the archive will be saved.
     * @param artifacts - A collection of virtual files where the key is the file path and the value is its content.
     *
     * @returns A promise that resolves to the full path / identifier of the created archive.
     */
    async writeArchive(folderName: string, artifacts: FileArtifacts): Promise<string> {

        const archive = await this.compressor.compress(artifacts)
		const archiveId = uuidV4()
		const archivePath =  `${folderName}/${archiveId}.tar.gz`
		await this.writeFile(archivePath, archive)
		return archivePath

    }

    /**
     * Reads a tar.gz archive from the storage backend and extracts it back into file artifacts.
     *
     * @param archivePath - The path / identifier of the archive to extract.
     *
     * @returns A promise that resolves to the extracted file artifacts.
     */
    async readArchive(archivePath: string): Promise<FileArtifacts> {
        const buffer = await this.readFile(archivePath)
		return await this.compressor.decompress(buffer)
    }
}
