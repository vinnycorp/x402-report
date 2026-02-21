#!/usr/bin/env node
/**
 * x402 Intelligence Report - Data Collector
 * Gathers x402-related activity from GitHub, Farcaster, and X/Twitter
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// --- Config ---
const GITHUB_SEARCH_QUERY = 'x402';
const NEYNAR_BASE = 'https://api.neynar.com/v2/farcaster/cast/search';
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';

// --- Helpers ---
function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const opts = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'x402-report/1.0',
        ...options.headers
      }
    };

    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

// --- GitHub Search ---
async function searchGitHub() {
  console.log('📦 Searching GitHub for x402...');
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Search repos
  const repoRes = await httpRequest(
    `https://api.github.com/search/repositories?q=x402&sort=updated&order=desc&per_page=10`
  );
  const repos = JSON.parse(repoRes.body);

  // Search code
  const codeRes = await httpRequest(
    `https://api.github.com/search/code?q=x402&sort=indexed&order=desc&per_page=10`
  );
  const code = JSON.parse(codeRes.body);

  // Search issues/PRs
  const issueRes = await httpRequest(
    `https://api.github.com/search/issues?q=x402+created:>=${since}&sort=created&order=desc&per_page=20`
  );
  const issues = JSON.parse(issueRes.body);

  return {
    source: 'github',
    repos: (repos.items || []).map(r => ({
      name: r.full_name,
      description: r.description,
      stars: r.stargazers_count,
      url: r.html_url,
      updated: r.updated_at,
      language: r.language
    })),
    code_results: code.total_count || 0,
    issues: (issues.items || []).map(i => ({
      title: i.title,
      url: i.html_url,
      state: i.state,
      created: i.created_at,
      repo: i.repository_url?.split('/').slice(-2).join('/'),
      is_pr: !!i.pull_request
    })),
    total_repos: repos.total_count || 0,
    total_issues: issues.total_count || 0
  };
}

// --- Farcaster via x402 ---
async function searchFarcaster() {
  console.log('🟣 Searching Farcaster via x402...');

  const walletKey = process.env.X402_WALLET_PRIVATE_KEY;
  if (!walletKey) {
    console.log('  ⚠️ No X402_WALLET_PRIVATE_KEY — skipping Farcaster x402');
    return { source: 'farcaster', casts: [], error: 'no wallet key' };
  }

  try {
    // First, hit the endpoint to get the x402 payment requirements
    const discoverRes = await httpRequest(`${NEYNAR_BASE}?q=x402&limit=25`);

    if (discoverRes.status === 402) {
      const paymentInfo = JSON.parse(discoverRes.body);
      console.log('  💳 x402 payment required:', JSON.stringify(paymentInfo.accepts?.[0] || {}, null, 2));

      // TODO: Implement x402 payment signing with ethers.js
      // For now, log the payment requirements
      return {
        source: 'farcaster',
        casts: [],
        x402_info: paymentInfo,
        status: 'payment_required_not_yet_implemented'
      };
    }

    // If we somehow got through without payment
    const data = JSON.parse(discoverRes.body);
    return {
      source: 'farcaster',
      casts: (data.result?.casts || []).map(c => ({
        text: c.text,
        author: c.author?.username,
        timestamp: c.timestamp,
        likes: c.reactions?.likes_count || 0,
        recasts: c.reactions?.recasts_count || 0,
        url: `https://warpcast.com/${c.author?.username}/${c.hash?.slice(0, 10)}`
      }))
    };
  } catch (err) {
    console.log('  ❌ Farcaster error:', err.message);
    return { source: 'farcaster', casts: [], error: err.message };
  }
}

// --- X/Twitter via Grok ---
async function searchTwitterViaGrok() {
  console.log('🐦 Searching X/Twitter via Grok mini...');

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.log('  ⚠️ No OPENROUTER_API_KEY — skipping Grok');
    return { source: 'twitter_grok', tweets: [], error: 'no api key' };
  }

  try {
    const res = await httpRequest(OPENROUTER_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://github.com/vinnycorp/x402-report'
      },
      body: JSON.stringify({
        model: 'x-ai/grok-3-mini',
        messages: [{
          role: 'user',
          content: `Search X/Twitter for the most notable tweets and discussions about "x402" (the HTTP 402 payment protocol) from the last 24 hours. For each tweet found, provide:
1. Author username
2. Tweet text (full)
3. Approximate engagement (likes/retweets if visible)
4. Link to tweet if possible

Focus on: protocol updates, new implementations, adoption announcements, community discussions, and opinions from key figures (Coinbase team, Base ecosystem builders, etc).

If there are no tweets from the last 24 hours, expand to the last 7 days.

Format as JSON array: [{"author": "", "text": "", "engagement": "", "url": "", "date": ""}]
Return ONLY the JSON array, no other text.`
        }],
        temperature: 0.1,
        max_tokens: 4000
      })
    });

    const data = JSON.parse(res.body);
    const content = data.choices?.[0]?.message?.content || '[]';

    // Try to parse the JSON from Grok's response
    let tweets = [];
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) tweets = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log('  ⚠️ Could not parse Grok response as JSON');
      tweets = [{ raw_response: content }];
    }

    return {
      source: 'twitter_grok',
      tweets,
      model: 'grok-3-mini',
      note: 'LLM-generated summaries — may contain inaccuracies'
    };
  } catch (err) {
    console.log('  ❌ Grok error:', err.message);
    return { source: 'twitter_grok', tweets: [], error: err.message };
  }
}

// --- Main ---
async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const today = new Date().toISOString().split('T')[0];

  console.log(`\n🔍 x402 Intelligence Report — ${today}\n`);

  const [github, farcaster, twitter] = await Promise.all([
    searchGitHub(),
    searchFarcaster(),
    searchTwitterViaGrok()
  ]);

  const report = {
    date: today,
    generated_at: new Date().toISOString(),
    sources: { github, farcaster, twitter }
  };

  if (dryRun) {
    console.log('\n📋 DRY RUN — Report data:');
    console.log(JSON.stringify(report, null, 2));
  } else {
    const outPath = path.join(__dirname, 'reports', `${today}.json`);
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Report saved to ${outPath}`);
  }

  // Output summary stats
  console.log(`\n📊 Summary:`);
  console.log(`  GitHub: ${github.total_repos} repos, ${github.total_issues} recent issues/PRs`);
  console.log(`  Farcaster: ${farcaster.casts?.length || 0} casts`);
  console.log(`  Twitter/Grok: ${twitter.tweets?.length || 0} tweets`);

  return report;
}

module.exports = { main, searchGitHub, searchFarcaster, searchTwitterViaGrok };

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}
