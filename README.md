# x402 Intelligence Report

Automated daily intelligence report tracking the **x402 protocol** (HTTP 402 Payment Required) ecosystem — developments, community discussions, and adoption signals across multiple data sources.

## What it does

- Searches **GitHub** for x402-related repos, issues, PRs, and commits (free API)
- Queries **Farcaster** via Neynar's x402 pay-per-request API (USDC on Base)
- Summarizes **X/Twitter** activity via Grok mini (OpenRouter)
- Compiles findings into a structured daily report delivered via Telegram
- Designed to track adoption of the x402 payment protocol across the crypto/web3 ecosystem

## Data Sources

| Source | Method | Cost | Reliability |
|--------|--------|------|-------------|
| GitHub | Search API | Free | ✅ Exact |
| Farcaster | Neynar x402 (USDC/Base) | ~$0.03/mo | ✅ Exact |
| X/Twitter | Grok mini via OpenRouter | ~$0.05/mo | ⚠️ Approximate |
| Google Alerts | Email digest | Free | ✅ Exact |

## Topics Tracked

| Category | What it catches |
|---|---|
| 🔧 Protocol Development | Core protocol changes, spec updates, RFCs |
| 🏗️ Implementations | New SDKs, libraries, integrations |
| 💼 Adoption | Companies/projects implementing x402 |
| 🌐 Ecosystem | Coinbase, Base, and related ecosystem moves |
| 💬 Community | Discussions, opinions, debates |
| 📊 Market Signal | Payment volume, usage metrics, trends |

## Key Accounts & Projects

Automatically tracks mentions from key x402 ecosystem participants:
- Coinbase / Base team
- x402 protocol contributors
- Payment infrastructure builders
- DeFi protocols adopting x402

## Architecture

```
GitHub API ──┐
Neynar x402 ─┤──▶ Sonnet 4.6 (compile) ──▶ Telegram delivery
Grok mini ───┘                                (8AM Bangkok daily)
```

## Usage

```bash
# Run the data collection
node collect.js

# Reports saved to reports/YYYY-MM-DD.md
```

## Requirements

- Node.js 18+
- `OPENROUTER_API_KEY` — for Grok mini + Sonnet 4.6
- `X402_WALLET_PRIVATE_KEY` — for Neynar x402 payments (USDC on Base)
- `X402_WALLET_ADDRESS` — hot wallet address on Base

## x402 Payment Details

This project dogfoods x402 itself — Farcaster data is fetched via x402 micropayments:
- **Network:** Base
- **Asset:** USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- **Cost:** ~$0.001 per API call
- **Wallet:** `0xa5f92A19f97Fd2c408edc20CE88ccCd35342c7B3`

## License

Private — all rights reserved.
