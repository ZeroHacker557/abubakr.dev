# Abubakr — fullstack developer portfolio

An Uzbek portfolio built around an interactive 3D service ecosystem. Contact: +998 97 400 98 77.

## Experience

- Four service modules: restaurant ordering, Telegram bots, websites, and custom business systems.
- A WebGL point cloud morphs between four shapes as visitors switch services. Supports pointer dragging, keyboard arrows, pause, reset, reduced motion, and a static fallback.
- Working local demos: restaurant cart and order progress; bot quick replies and chat; three website themes with a projects view; task workflow and live completion totals.
- All demos are clearly labeled and send no orders, messages, or external requests.
- Direct telephone link and clipboard copy with success/error feedback.
- Responsive layouts for desktop, tablet, and phone. Phone controls are in normal document flow, with touch targets and wrapping layouts.

## Development

Use the existing pnpm lockfile and Node 22.13 or later. `pnpm dev` starts the local preview. `pnpm build` exports to `dist/client`. `node node_modules/typescript/bin/tsc --noEmit` validates types.

This Windows environment has previously required Node 22 to avoid a Node 24 shutdown crash. A temporary build runtime is located at `D:/CodexTemp/zur-portfolio-01a08b00/node22.exe`. The original package scripts are preserved.

`app/portfolio-data.ts` contains the profile and service descriptions. `app/service-demos.tsx` holds the demos, and `app/ecosystem.tsx` renders the 3D scene. The previous `#ishlar` link remains an alias for the new demo section.

The existing Sites project points to the public SUNSHORE site. Save updated versions for review; deployment requires the owner's outstanding approval to replace that public site.
