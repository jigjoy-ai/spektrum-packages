import { Upload } from "@aws-sdk/lib-storage"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
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
}
