import { FileArtifacts } from '../file-artifacts'

export interface FileArtifactsStorage {

    /**
     * Uploads a file artifact to a bucket and returns the path to the file
     * @param bucket - The bucket to upload the file to
     * @param folder - The folder to upload the file to
     * @param fileArtifacts - The file artifact to upload
     * @returns The path to the zipped file
     */
    upload(bucket: string, folder: string, fileArtifacts: FileArtifacts): Promise<string>

    /**
     * Downloads a file artifact from a bucket and returns the file artifact
     * @param bucket - The bucket to download the file from
     * @param archivePath - The path to the file to download
     * @returns The file artifacts
     */
    download(bucket: string, archivePath: string): Promise<FileArtifacts>
}