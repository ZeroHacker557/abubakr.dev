# Abubakr — fullstack developer portfolio

An Uzbek portfolio with an interactive metallic 3D sculpture and hands-on service demos. Contact: +998 97 400 98 77.

## Experience

- Four service modules: restaurant ordering, Telegram bots, websites, and custom business systems.
- The original lime and chrome WebGL sculpture sits beside the introduction, without a surrounding control panel. Supports pointer dragging, keyboard arrows, Space or double-click to pause, reduced motion, and a static fallback.
- Self-hosted Sora and Instrument Serif provide the typography. Font files and their SIL Open Font License notices are in `public/fonts`.
- Working local demos: restaurant cart and order progress; bot quick replies and chat; three website themes with a projects view; task workflow and live completion totals.
- All demos are clearly labeled and send no orders, messages, or external requests.
- Direct telephone link and clipboard copy with success/error feedback.
- Instagram and Telegram profile links in the responsive footer.
- An animated company gallery features the supplied MUSA, V7, Fresh Express, and Afsona logos, with pause and reduced-motion support.
- A draggable before/after comparison presents the same three sample restaurant orders as manual records and an integrated dashboard, with keyboard support and view buttons.
- Sticky orbit navigation follows the current section; the mobile dialog menu supports keyboard focus and closes after navigation.
- Responsive layouts for desktop, tablet, and phone. Phone controls are in normal document flow, with touch targets and wrapping layouts.

## Development

Use the existing pnpm lockfile and Node 22.13 or later. `pnpm dev` starts the local preview. `pnpm build` exports to `dist/client`. `node node_modules/typescript/bin/tsc --noEmit` validates types.

This Windows environment has previously required Node 22 to avoid a Node 24 shutdown crash. A temporary build runtime is located at `D:/CodexTemp/zur-portfolio-01a08b00/node22.exe`. The original package scripts are preserved.

`app/portfolio-data.ts` contains the profile and service descriptions. `app/service-demos.tsx` holds the demos, and `app/sculpture.tsx` renders the hero scene. The previous `#ishlar` link remains an alias for the new demo section.

## Vercel deployment

The repository uses Vinext's static export. `vercel.json` selects the **Other** framework preset, runs `pnpm build`, and serves `dist/client`, where the generated `index.html` and browser assets live. Vercel detects pnpm from the existing lockfile.

Import the repository with its root directory set to the folder containing `package.json` and `vercel.json` (the repository root). The Node.js version must satisfy `package.json` (22.13 or later). Deploy a commit containing `vercel.json`; redeploying an older commit will not include this fix. If the production domain still returns `404 NOT_FOUND` after a successful build, check that it is assigned to this project's latest production deployment under Settings → Domains.

The existing Sites project points to the public SUNSHORE site. Save updated versions for review; deployment requires the owner's outstanding approval to replace that public site.
