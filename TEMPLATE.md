# x402 Report Telegram Template
# The cron job MUST follow this format exactly. No deviations.
# Use markdown formatting (bold with **, hyperlinks with [text](url))
# Do NOT use HTML tags like <b> — Telegram uses markdown here.

## ⚠️ CRITICAL RULE: EVERY ITEM MUST HAVE AT LEAST ONE SOURCE LINK
## Items without [1](url) links are INVALID and must not be included.
## If you have no URL for an item, SKIP that item entirely.
## The source URLs come from the collected JSON data — use them.

## FORMAT:

**x402 Daily Report: {Mon} {Day}, {Year} ⚡**
{N_ALERTS} alerts · {N_CASTS} casts · {N_TWEETS} tweets · {N_GITHUB_ISSUES} GitHub issues/PRs

━━━━━━━━━━━━━━━━━━━━

**NEW INTEGRATIONS & PRODUCTS**

1\. **Sentinel** | [1](https://github.com/valeo-cash/Sentinel) · [2](https://farcaster.xyz/example)
Enterprise audit and budget enforcement layer for x402. Adds spending limits and circuit breakers so agent payments stay within approved bounds. TypeScript, 2 stars.

2\. **x402-deploy** | [1](https://github.com/navsahu/x402-deploy)
1-click deployment tool to monetize APIs and MCP servers with x402. No code changes required — wraps existing services with pay-per-call infrastructure.

━━━━━━━━━━━━━━━━━━━━

**ECOSYSTEM & PROTOCOL UPDATES**

1\. **{Name}** | [1]({URL}) · [2]({URL})
{2-3 sentences. Spec changes, SDK updates, governance, infrastructure moves.}

2\. **{Name}** | [1]({URL}) · [2]({URL})
{2-3 sentences.}

━━━━━━━━━━━━━━━━━━━━

**COMMUNITY & DISCUSSION**

- **@{author}**: "{key quote or insight}" | [1]({URL})

- **@{author}**: "{key quote or insight}" | [1]({URL})

- **@{author}**: "{key quote or insight}" | [1]({URL})

{Pick the most insightful or contrarian takes. Skip generic hype.}

━━━━━━━━━━━━━━━━━━━━

**ACTION ITEMS**

🔧 {tool/product to try} - {why it's worth trying}
💰 {investment signal or opportunity} - {context}
📈 {trend to watch} - {what to look for next}
⚠️ {risk or concern} - {what to be aware of}

## RULES:
- ⚠️ EVERY item in NEW INTEGRATIONS and ECOSYSTEM must include at least one [1](url) link — no exceptions
- Source URLs come from the JSON data (github.repos[].url, farcaster casts, google alerts, tweets)
- Source links use [1], [2] etc (not "source 1")
- Source links go INLINE after the item name, separated by |
- If the same project appears in GitHub AND Farcaster/alerts, include both links: [1](github_url) · [2](farcaster_url)
- No emojis in section item names (except ACTION ITEMS)
- Emojis YES in ACTION ITEMS
- No line breaks between ACTION ITEMS
- Line breaks between ALL list items (NEW INTEGRATIONS, ECOSYSTEM, COMMUNITY)
- NEW INTEGRATIONS and ECOSYSTEM use numbered lists (1\. 2\. 3\. etc) with a blank line between each item
- COMMUNITY uses bullet points (-) with a blank line between each item
- Use - (dash) not — (em dash) in body text
- Bold section headings
- Bold item names and author names
- SYNTHESIZE across sources - same project from GitHub + Farcaster = ONE item with both links
- Deduplicate aggressively - same story from different sources = one item, multiple links
- Prioritize: new launches/integrations > protocol changes > community takes > speculation
- Skip Grok tweets that look hallucinated (wrong dates, generic content, no real engagement data)
- Do NOT organize by data source - organize by THEME
- Do NOT mention the day of the week
- Use abbreviated month names: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- ACTION ITEMS should be genuinely useful - specific tools to try, projects to watch, investment angles
- Cap NEW INTEGRATIONS at 8 items max — curate, don't dump everything
