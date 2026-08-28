# shortlink-svc-v2

Small bookmark service with search and tags

## Installation

```bash
npm install
npm run dev
```

## Examples

```bash
curl -X POST localhost:3000/api/bookmarks \
  -H 'content-type: application/json' \
  -d '{"url": "https://example.com", "tags": ["reading"]}'
```

## Highlights

- REST endpoints: list / create / delete / search
- Request validation helpers, no framework magic
- In-memory store with optional JSON persistence
- Ready for Render/Fly deploy with PORT env
- Morgan logging and centralized error handler

## Project structure

```text
├── .github/
│   └── dependabot.yml
├── docs/
│   ├── configuration.md
│   ├── development.md
│   └── usage.md
├── examples/
│   └── quickstart.md
├── src/
│   ├── config.js
│   ├── index.js
│   └── store.js
├── .editorconfig
├── .gitattributes
├── .gitignore
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
└── package.json
```

## Development

```bash
npm install
npm test
```

## License

MIT licensed, see LICENSE.
