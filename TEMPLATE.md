# x402 Report Telegram Template
# The cron job MUST follow this format exactly. No deviations.
# Use markdown formatting (bold with **, hyperlinks with [text](url))
# Do NOT use HTML tags like <b> — Telegram uses markdown here.

## FORMAT:

**x402 Daily Report: {MONTH} {DAY}, {YEAR} ⚡**
{N_ALERTS} alerts · {N_CASTS} casts · {N_TWEETS} tweets · {N_GITHUB_ISSUES} GitHub issues/PRs

━━━━━━━━━━━━━━━━━━━━

**NEW INTEGRATIONS & PRODUCTS**

1\. **{Name}** | [1]({URL}) · [2]({URL})
{2-3 sentences. What launched, who built it, why it matters for x402.}

2\. **{Name}** | [1]({URL}) · [2]({URL})
{2-3 sentences.}

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
- Source links use [1], [2] etc (not "source 1")
- Source links go INLINE, separated by |
- No emojis in section item names (except ACTION ITEMS)
- Emojis YES in ACTION ITEMS
- No line breaks between ACTION ITEMS
- Line breaks between COMMUNITY & DISCUSSION items
- Use - (dash) not — (em dash) in body text
- Bold section headings
- Bold author names in quotes
- SYNTHESIZE across sources - if the same topic appears in Google Alerts, Farcaster, AND GitHub, consolidate into ONE item with links from all sources
- Deduplicate aggressively - same story from different sources = one item, multiple links
- Prioritize: new launches/integrations > protocol changes > community takes > speculation
- Skip Grok tweets that look hallucinated (wrong dates, generic content, no real engagement data)
- Do NOT organize by data source - organize by THEME
- Do NOT mention the day of the week
- ACTION ITEMS should be genuinely useful - specific tools to try, projects to watch, investment angles
