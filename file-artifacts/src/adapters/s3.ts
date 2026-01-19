import { Upload } from "@aws-sdk/lib-storage"
import { DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3"
import { Readable } from "stream"
import { StreamConverter } from "../utils/stream-converter"
import { S3Port } from "../ports/s3"

export class S3Adapter implements S3Port {
	s3: S3Client = new S3Client()

	constructor(readonly bucket: string) {
		if (!bucket) throw Error("Invalid bucket name")
	}

	private getContentType(filename: string): string {
		const ext = filename.split(".").pop()?.toLowerCase()
		switch (ext) {
			case "html":
				return "text/html"
			case "css":
				return "text/css"
			case "js":
				return "application/javascript"
			case "json":
				return "application/json"
			case "png":
				return "image/png"
			case "jpg":
			case "jpeg":
				return "image/jpeg"
			case "svg":
				return "image/svg+xml"
			case "ico":
				return "image/x-icon"
			case "txt":
				return "text/plain"
			case "woff":
				return "font/woff"
			case "woff2":
				return "font/woff2"
			case "tar.gz":
				return "application/x-compressed-tar"
			default:
				return "application/octet-stream"
		}
	}

	async upload(key: string, data: string | Buffer): Promise<void> {
		const stream = StreamConverter.toStream(data)
		const upload = new Upload({
			client: this.s3,
			params: {
				Bucket: this.bucket,
				Key: key,
				Body: stream, // ✅ Node.js Readable stream
				ContentType: this.getContentType(key),
			},
		})

		await upload.done()
	}

	async download(key: string): Promise<Buffer> {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: key,
		})

		const response = await this.s3.send(command)

		if (!response.Body || !(response.Body instanceof Readable)) {
			throw new Error("S3 returned an invalid or empty response body")
		}

		return await StreamConverter.toBuffer(response.Body)
	}
	
	async deleteFolder(folderPath: string): Promise<void> {
		let isTruncated = true
		let continuationToken
		
		while (isTruncated) {
			// 1. List objects with the specific prefix
			const listParams = {
				Bucket: this.bucket,
				Prefix: folderPath,
				ContinuationToken: continuationToken
			}
			const listResponse = await this.s3.send(new ListObjectsV2Command(listParams))
		
			if (listResponse.Contents && listResponse.Contents.length > 0) {
				// 2. Format keys for the batch delete
				const deleteParams = {
					Bucket: this.bucket,
					Delete: {
						Objects: listResponse.Contents.map((obj) => ({ Key: obj.Key })),
						Quiet: false,
					},
				}
			
				// 3. Execute batch delete (up to 1,000 objects per call)
				await this.s3.send(new DeleteObjectsCommand(deleteParams))
			}
		
			// 4. Check if there are more objects to process
			isTruncated = listResponse.IsTruncated ?? false
			continuationToken = listResponse.NextContinuationToken
		}
	}
	
}
