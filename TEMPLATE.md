# x402 Report Telegram Template
# The cron job MUST follow this format exactly. No deviations.
# Use markdown formatting (bold with **, hyperlinks with [text](url))
# Do NOT use HTML tags like <b> — Telegram uses markdown here.

## FORMAT:

**x402 Daily Report: {DATE} ⚡**
{N_GITHUB_ISSUES} new issues/PRs · {N_CASTS} casts · {N_ALERTS} alerts · {N_TWEETS} tweets

━━━━━━━━━━━━━━━━━━━━

**TOP DEVELOPMENTS**

1\. **{Development Name}** | [1]({URL}) · [2]({URL})
{2-3 sentence summary. Focus on what changed and why it matters for x402 adoption.}

2\. **{Development Name}** | [1]({URL}) · [2]({URL})
{2-3 sentence summary.}

{...up to 5 developments, ranked by significance}

━━━━━━━━━━━━━━━━━━━━

**ECOSYSTEM SIGNALS**

🏗️ {signal} - {implication}
🤖 {signal} - {implication}
💰 {signal} - {implication}
📊 {signal} - {implication}
⚠️ {signal} - {implication}
🔗 New integrations: {PROJECT} ([1]({URL})), {PROJECT} ([2]({URL}))

━━━━━━━━━━━━━━━━━━━━

**NOTABLE CASTS & TWEETS**

- **@{author}**: "{quote}" | [1]({URL})

- **@{author}**: "{quote}" | [1]({URL})

- **@{author}**: "{quote}" | [1]({URL})

━━━━━━━━━━━━━━━━━━━━

**GITHUB HIGHLIGHTS**

- {repo/PR/issue description} | [1]({URL})
- {repo/PR/issue description} | [1]({URL})
- {repo/PR/issue description} | [1]({URL})

## RULES:
- Source links use [1], [2] etc (not "source 1")
- Source links go INLINE, separated by |
- No emojis in TOP DEVELOPMENTS item names
- Emojis YES in ECOSYSTEM SIGNALS
- No line breaks between ECOSYSTEM SIGNALS items
- Line breaks between NOTABLE CASTS & TWEETS items
- Use - (dash) not — (em dash) in body text
- Bold section headings
- Bold author names in quotes
- Synthesize across sources - don't just list each source separately
- Prioritize: new integrations > protocol updates > community discussion > speculation
- If a development appears in multiple sources, consolidate into one item with multiple source links
- Skip Grok tweets that look hallucinated (wrong dates, generic content, no real engagement data)
