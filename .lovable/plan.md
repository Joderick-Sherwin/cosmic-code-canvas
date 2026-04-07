

## Plan: Convert Portfolio to Static GitHub-Only Architecture

### Summary
Remove all backend (Supabase/Lovable Cloud) dependencies. All profile data becomes a static JSON file, the AI chatbot is removed (requires a server), and admin pages are removed. The site becomes a pure static React app deployable anywhere.

### What Changes

**1. Create static data file** — `src/data/profileData.ts`
Export all profile content (hero, contact, summary, experience, skills, projects, education, certifications, awards, leadership) as a typed constant, using the exact data currently in the database.

**2. Replace `useProfileContent` hook** — `src/hooks/useProfileContent.ts`
Rewrite to simply return the static data with `isLoading: false` and `error: null`. No async fetching, no Supabase calls. This keeps all downstream components unchanged.

**3. Remove AI Chatbot** — `src/components/AIChatbot.tsx`
Remove the component and its usage in `Index.tsx`. The chatbot requires an edge function and API key — not viable without a backend.

**4. Remove Admin pages** — `src/pages/AdminLogin.tsx`, `src/pages/AdminDashboard.tsx`
Delete these files and remove their routes from `App.tsx`. Content is now edited directly in the static data file via GitHub.

**5. Clean up App.tsx**
Remove admin routes. Remove Supabase-related imports if any remain.

**6. Remove edge functions** — `supabase/functions/chat/`, `supabase/functions/create-admin/`
These are no longer needed.

### Files Modified
| File | Action |
|------|--------|
| `src/data/profileData.ts` | Create — all portfolio data |
| `src/hooks/useProfileContent.ts` | Rewrite — return static data |
| `src/pages/Index.tsx` | Edit — remove AIChatbot import/usage, remove loading state |
| `src/App.tsx` | Edit — remove admin routes |
| `src/components/AIChatbot.tsx` | Delete |
| `src/pages/AdminLogin.tsx` | Delete |
| `src/pages/AdminDashboard.tsx` | Delete |
| `supabase/functions/chat/index.ts` | Delete |
| `supabase/functions/create-admin/index.ts` | Delete |

### What Stays Unchanged
All visual components (HeroSection, AboutSection, SkillsSection, etc.), animations, neural background, parallax effects, and styling remain exactly as they are. They already receive data via props — only the data source changes.

### How to Update Content Going Forward
Edit `src/data/profileData.ts` directly in GitHub. Push changes, and the site rebuilds automatically.

