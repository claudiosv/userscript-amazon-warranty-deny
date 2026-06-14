# Amazon Auto-Decline Warranty

A userscript that automatically clicks **"No thanks"** on Amazon's warranty / protection-plan popup so you never have to dismiss it manually.

## Install

> Requires [Tampermonkey](https://www.tampermonkey.net/) or a compatible userscript manager.

**[Install warranty-deny.user.js](https://github.com/claudiosv/userscript-amazon-warranty-deny/releases/latest/download/warranty-deny.user.js)**

## How it works

A `MutationObserver` watches for DOM changes on product pages. The moment the warranty widget (`#attachSiNoCoverage`) appears and becomes visible, it clicks the hidden input that triggers "No thanks" and logs a confirmation to the console.

## Supported sites

All major Amazon storefronts — `.com`, `.ca`, `.co.uk`, `.de`, `.fr`, `.it`, `.es`, `.nl`, `.se`, `.pl`, `.com.be`, `.co.jp`, `.in`, `.com.au`, `.sg`, `.ae`, `.sa`, `.eg`, `.com.tr`, `.co.za`, `.com.br`, `.com.mx`.

Match patterns cover both `/*/dp/*` and `/gp/product/*` URL formats.

## Development

```bash
pnpm install
pnpm build        # outputs dist/warranty-deny.user.js
pnpm typecheck
pnpm lint
pnpm format
```

### Release

```bash
pnpm release           # patch bump (default)
pnpm release minor
pnpm release major
```

This bumps the version in `package.json`, commits, tags, and pushes. GitHub Actions then builds the userscript and publishes it as a release asset.
