---
Task ID: 1
Agent: Main Agent
Task: Guardian AI Concierge Upgrade — Full Implementation

Work Log:
- Read and analyzed existing Guardian AI implementation (sidebar component, API route, system prompt)
- Created `src/lib/ghl.ts` — GoHighLevel CRM integration module with lead push, validation, and deposit violation check
- Created `src/app/api/ghl/rescue-lead/route.ts` — API endpoint for rescue lead capture with dual-write (GHL CRM + local DB fallback)
- Updated `prisma/schema.prisma` — Added `RescueLead` model with 13 fields (workflow, zip, trade, amounts, CRM sync status)
- Ran `bun run db:push` — Schema pushed to SQLite successfully
- Completely rewrote `src/app/api/guardian-ai/route.ts`:
  - New system prompt with 5 protocols (The $1,000 Rule, Ghosting Rescue, Concierge Matchmaker, 20-Point Shield, Homeowner Vault)
  - Server-side workflow detection (ghosting keywords, matchmaking keywords)
  - Real-time deposit amount parsing and CA BPC §7159 violation detection
  - 30-min TTL + 500 session cap with LRU cleanup (memory leak fix preserved)
- Completely rewrote `src/components/guardian-ai.tsx`:
  - New priority quick actions: "Help! My contractor ghosted me" + "I can't find a Pro in my area"
  - Standard quick actions preserved as compact pills
  - Workflow state machine (idle → ghosting_rescue/matchmaking)
  - Inline intake forms with conditional fields per workflow type
  - Real-time deposit violation warning in form ($1,000 limit)
  - Trade dropdown (15 options) and timeline dropdown
  - Form submission to rescue-lead API with validation
  - Post-submission confirmation in chat
  - Workflow CTA button for mid-conversation form access
- Updated `.env` with GHL_API_KEY and GHL_LOCATION_ID placeholders
- Fixed health check API at `/api/route.ts`

Stage Summary:
- ESLint: 0 errors, 0 warnings
- All 3 workflows tested and verified:
  - Ghosting rescue: workflow=ghosting_rescue, depositAlert=$3,500 violation detected
  - Matchmaking: workflow=matchmaking triggered correctly
  - Deposit check: $1,000 rule working both in system prompt and server-side parsing
- Rescue lead API tested: local DB fallback working, GHL CRM ready (pending credentials)
- Dev server: compiled, serving 200s
