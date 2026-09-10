# ZUR — interactive 3D portfolio

An Uzbek-language portfolio with a live Three.js sculpture, material switching, pointer and keyboard rotation, motion controls, project detail dialogs, and responsive layouts.

## Personalize

Edit `app/portfolio-data.ts` to replace the example projects and add your email or Telegram URL. ORBIT and FORMA are clearly labeled independent visual concepts, not claims of client work. The current display brand is ZUR.

## Development

Node 22.13+ and the existing pnpm lockfile are required. Run `pnpm dev` for local preview, `pnpm build` for the static export in `dist/client`, and `pnpm exec tsc --noEmit` to check types.

The sculpture supports pointer drag and arrow keys, three material presets, pause/resume, and orientation reset. It respects reduced-motion preferences and pauses rendering outside the viewport. A static artwork fallback appears if WebGL fails. Dialogs use the installed accessible Base UI primitive.

Project artworks were generated for this concept. Prior game files remain in the repository as an archive of the earlier project and are not imported by the portfolio.
