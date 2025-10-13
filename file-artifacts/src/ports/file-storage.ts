export interface FileStorage {

    /**
     * Uploads a file to a bucket
     * @param bucket - The bucket to upload the file to
     * @param fileName - The name of the file to upload
     * @param stream - The stream of the file to upload
     * @returns A promise that resolves when the file is uploaded
     */
    upload(bucket: string, fileName: string, stream: NodeJS.ReadableStream): Promise<void>

    /**
     * Downloads a file from a bucket
     * @param bucket - The bucket to download the file from
     * @param fileName - The name of the file to download
     * @returns A promise that resolves when the file is downloaded
     */
    download(bucket: string, fileName: string): Promise<Buffer>
}