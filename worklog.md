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

---
Task ID: 2
Agent: Main Agent
Task: Rescue First Strategy — Video Embed + System Prompt Rewrite + Sidebar UX Pivot

Work Log:
- Embedded NotebookLM YouTube video (https://youtu.be/Oz-NQbmwGRc) on protection-guide-download page, replacing book mockup in right column with styled iframe + browser-chrome wrapper + floating badge
- Added AI Interaction CTA card below video: "Got contractor problems?" with pointer to Guardian AI sidebar
- Completely rewrote Guardian AI system prompt to "Rescue First / Concierge First" strategy:
  - "Two Hats" model: Assistant (browsing) vs Concierge (Rescue Mode)
  - Protocol 1 (Ghosting Rescue): Empathy → Immediate Help → Collect ZIP/Trade → Handoff → Deposit Check (as benefit)
  - Protocol 2 (Matchmaker): Reassure → Differentiate from competitors → Collect → Set expectations
  - Protocol 3 ($1,000 Rule): Embedded as BENEFIT not lecture, only after building trust
  - Protocol 4 (20-Point Shield): THE REASON WHY, not the lead — frame as "why our Pros are safer"
  - Protocol 5 (Vault): "So this never happens again" framing
- Updated sidebar quick actions to action-oriented language:
  - "My contractor disappeared — Help!" (red alert style)
  - "Find me a Vetted Pro now." (turquoise style)
  - "Did I overpay my deposit?" (compact pill)
  - "Open my Project Vault." (compact pill)
- Updated welcome message, section header ("How can we help?"), input placeholder ("What's going on with your project?")
- Matchmaking button gets turquoise styling (not red) to differentiate from emergency
- Cleaned up unused imports (Phone, MapPin, Clock, FileText)

Stage Summary:
- ESLint: 0 errors
- Ghosting response: "I'm so sorry... Let's get your roof back on track. What's your ZIP code?" ✅ Empathy-first
- Matchmaking response: "Don't settle for unverified Pros. Every Pro has passed our 20-Point Shield audit." ✅ Differentiation
- Deposit response: "That's actually a violation... you may have grounds to recover those funds" ✅ Benefit framing
- Video embedded next to Download button with AI CTA bridge
- All API routes returning 200
