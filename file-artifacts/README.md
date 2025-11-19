# file-artifacts

Minimal toolkit for working with **FileArtifacts** — virtual collections of files represented as `{ path: content }` pairs.

- Write all artifacts to the local filesystem in one call.
- Read or create archives that store the entire artifact set for transport or storage.
- Choose between filesystem or S3-backed storage adapters.

## Examples

### Store artifacts on the local filesystem

```ts
import { FileSystemStorageFactory } from "@jigjoy-io/file-artifacts/dist/factories/fs-storage-factory"

const factory = new FileSystemStorageFactory()
const storage = factory.create()

const artifacts = {
	"dist/index.js": "// built bundle",
	"dist/index.css": "body { background: #000 }",
}

await storage.writeAll("artifacts/build-123", artifacts)
const archiveKey = await storage.writeArchive("archives/build-123", artifacts)
console.log(`Archive stored at ${archiveKey}`)
```

### Store artifacts in S3

```ts
import { S3StorageFactory } from "@jigjoy-io/file-artifacts/dist/factories/s3-storage-factory"

const factory = new S3StorageFactory(process.env.ARTIFACTS_BUCKET!)
const storage = factory.create()

await storage.writeAll("builds/2024-11-19", artifacts)
const s3ArchivePath = await storage.writeArchive("archives/2024-11-19", artifacts)
console.log(`Archive uploaded to s3://${process.env.ARTIFACTS_BUCKET}/${s3ArchivePath}`)
```

Both adapters now expose the same `StorageFactory` interface, so switching between filesystem and S3 storage is as simple as swapping factories.