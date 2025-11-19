# file-artifacts

Minimal toolkit for working with **FileArtifacts** — virtual collections of files represented as `{ path: content }` pairs.

- Write all artifacts to the local filesystem in one call.
- Read or create archives that store the entire artifact set for transport or storage.
- Choose between filesystem or S3-backed storage adapters.

## Examples

### Store artifacts on the local filesystem

```ts
import { LocalFileSystem } from "@jigjoy-io/file-artifacts/dist/adapters/local-file-system"
import { TarGzCompressorService } from "@jigjoy-io/file-artifacts/dist/adapters/targz-compressor-service"
import { FileSystemArtifactsStorage } from "@jigjoy-io/file-artifacts/dist/storage/fs-artifact-storage"

const fsPort = new LocalFileSystem()
const compressor = new TarGzCompressorService()
const storage = new FileSystemArtifactsStorage(fsPort, compressor)

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
import { S3Adapter } from "@jigjoy-io/file-artifacts/dist/adapters/s3"
import { TarGzCompressorService } from "@jigjoy-io/file-artifacts/dist/adapters/targz-compressor-service"
import { S3ArtifactsStorage } from "@jigjoy-io/file-artifacts/dist/storage/s3-artifact-storage"

const s3 = new S3Adapter(process.env.ARTIFACTS_BUCKET!)
const compressor = new TarGzCompressorService()
const storage = new S3ArtifactsStorage(s3, compressor)

await storage.writeAll("builds/2024-11-19", artifacts)
const s3ArchivePath = await storage.writeArchive("archives/2024-11-19", artifacts)
console.log(`Archive uploaded to s3://${process.env.ARTIFACTS_BUCKET}/${s3ArchivePath}`)
```

Both adapters share the same `FileArtifactsStorage` interface, so switching between filesystem and S3 storage is a dependency swap rather than a rewrite.