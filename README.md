# Platform SDK

Official client SDK for interacting with our platform services.

## Installation

```bash
npm install @org/platform-sdk
```

## Quick Start

```typescript
import { Client } from '@org/platform-sdk';

const client = new Client({ apiKey: process.env.API_KEY });
const result = await client.resources.list();
```

## Documentation

See [docs/](./docs/) for full API reference.

## License

MIT
<!-- touched 2025-12-28 -->
<!-- touched 2026-02-03 -->
<!-- touched 2026-04-11 -->
<!-- touched 2026-05-06 -->
