# file-artifacts

Minimal toolkit for working with **FileArtifacts** — virtual collections of files represented as `{ path: content }` pairs.

- Write all artifacts to the local filesystem in one call.
- Read or create archives that store the entire artifact set for transport or storage.
- Choose between filesystem or S3-backed storage adapters.