export interface S3Port {
	upload(key: string, data: string | Buffer): Promise<void>
	download(key: string): Promise<Buffer>
	deleteFolder(key: string): Promise<void>
}
