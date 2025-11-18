
import { CompressorService } from "../ports/compressor-service"
import { FileArtifactsStorage } from "./file-artifacts-storage"
import { FileSystemPort } from "../ports/file-system"

export class FileSystemArtifactsStorage extends FileArtifactsStorage {


    constructor(readonly fileSystem: FileSystemPort, compressor: CompressorService){
        super(compressor)
    }

    async writeFile(path: any, content: any): Promise<void> {
        await this.fileSystem.writeFile(path, content)
    }

    async readFile(path: any): Promise<Buffer> {
        const content = await this.fileSystem.readFile(path, 'utf-8')
        return Buffer.from(content)
    }

}