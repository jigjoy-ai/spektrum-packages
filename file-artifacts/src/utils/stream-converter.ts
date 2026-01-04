import { Readable } from "stream"

export class StreamConverter {
	static toStream(value: string | Buffer): Readable {
		return Readable.from([value])
	}

	static async toBuffer(stream: Readable): Promise<Buffer> {
		const chunks: Buffer[] = []
		for await (const chunk of stream) {
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
		}
		return Buffer.concat(chunks)
	}
}
