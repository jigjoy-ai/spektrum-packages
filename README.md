## JigJoy Packages

This repository houses the shared packages published by the `@jigjoy-io` organization. Each package serves a specific surface area that other JigJoy services and apps reuse, making it easier to ship consistent tooling across projects.

### Current Packages

- `@jigjoy-io/file-artifacts` — Utilities for reading, writing, compressing, and transporting virtual file artifact sets via filesystem or S3 adapters.
- `@jigjoy-io/project-versioning-client` — SDK for creating and querying project versions from external services.
- `@jigjoy-io/serverless-core` — TypeScript helpers for building consistent serverless handlers, responses, and validators.
- `@jigjoy-io/design` (`ui-library/`) — Tailwind-based React component library with shared theming, motion, and accessibility primitives.

### Contributing

Each package folder contains its own build scripts and README. Run `npm install` and `npm run build` within a package before publishing updates. Keep cross-package changes coordinated through this monorepo to preserve compatibility.

