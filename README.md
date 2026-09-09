# SUNSHORE

A browser-based 3D open-world prototype set in the fictional coastal city of San Paloma. The playable character is inspired by the supplied portrait: white cap, white T-shirt, dark hair, and blue trousers. This is an original prototype, not a full commercial-scale GTA game or an exact scanned likeness.

## Play

- WASD / arrow keys: walk or drive
- Shift: sprint / vehicle boost
- Space: jump / handbrake
- E: enter a nearby parked car or exit at low speed
- Drag: orbit the camera
- M: city map
- Escape: pause
- R: recover to a safe street
- Sound button: enable synthesized engine audio

Complete the waterfront, lighthouse, and return missions to earn rewards, then continue exploring. Progress lasts for the current session. Touch controls are available on touch devices.

## Development

Use Node 22.13 or newer and pnpm. Run `pnpm install`, then `pnpm dev`. `pnpm build` creates the static release in `dist/client`. `pnpm exec tsc --noEmit` validates TypeScript. Three.js powers a procedural city with instanced scenery, shadow mapping, traffic, walking pedestrians, and water animation. Parked cars are drivable; traffic cars are ambient. Buildings have exterior collision and no interiors.

WebMCP actions register only where document.modelContext is supported. No supported validation context was available during delivery, so these optional actions were not independently verified.
