# Character Vector Blueprints & Kinematics

This reference provides production-ready vector coordinates, layer groups, and CSS keyframe animations for the 5 iconic developer characters, plus the modular framework to create any new custom character.

---

## 1. Universal Kinematics & Coordinate Standard

All characters must adhere to:
- **Baseline Alignment**: Feet, hover shadow, or desk baseline anchored at `y = 200` (on a 240px–260px height canvas).
- **GPU Transform Rules**: All moving parts must include:
  ```css
  transform-box: fill-box;
  transform-origin: center;
  ```
- **Logical Stationing**: Station characters to balance headlines and code snippets (e.g. Character on right at `x = 550..700`, text on left at `x = 50..450`).

---

## 2. Character 1: Cyber Bot (Hovering Autonomous Assistant)

### Visual Features:
- Floating aerodynamic chassis with drop-shadow ground ripple
- Pulsing thruster exhaust flame
- Blinking yellow antenna beacon
- Glowing cyan eye visor with horizontal scan sweep
- Floating terminal speech bubble with live status

### Vector Markup:
```xml
<g id="cyber-bot" transform="translate(620, 50)">
  <!-- Floating Speech Bubble -->
  <g class="anim-float-speech" style="animation: speechPulse 3.5s ease-in-out infinite;">
    <rect x="-85" y="-35" width="170" height="28" rx="8" fill="#111320" stroke="#38bdf8" stroke-width="1.2" opacity="0.95" />
    <polygon points="-5,-7 5,-7 0,0" fill="#38bdf8" />
    <circle cx="-68" cy="-21" r="3" fill="#22c55e" />
    <text x="-56" y="-17" font-family="'Fira Code', monospace" font-size="10" font-weight="600" fill="#38bdf8">
      STATUS // READY
    </text>
  </g>

  <!-- Hovering Bot Body -->
  <g class="anim-bot-hover" style="animation: botHover 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center;">
    <!-- Antenna Beacon -->
    <line x1="0" y1="-8" x2="0" y2="4" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="0" cy="-10" r="4" fill="#fbbf24" style="animation: beaconPulse 1.2s ease-in-out infinite;" />

    <!-- Head & Chassis -->
    <rect x="-24" y="4" width="48" height="42" rx="14" fill="#1e1b4b" stroke="#38bdf8" stroke-width="2" />
    
    <!-- Visor Screen -->
    <rect x="-18" y="14" width="36" height="15" rx="6" fill="#090d16" stroke="#06b6d4" stroke-width="1" />
    <!-- Visor Eye Optics -->
    <ellipse cx="-7" cy="21.5" rx="4" ry="3" fill="#22d3ee" />
    <ellipse cx="7" cy="21.5" rx="4" ry="3" fill="#22d3ee" />

    <!-- Chassis Core Light -->
    <circle cx="0" cy="34" r="3.5" fill="#a855f7" />

    <!-- Jet Thruster Exhaust -->
    <polygon points="-9,46 9,46 0,62" fill="#06b6d4" style="animation: thrusterFlicker 0.25s alternate infinite; transform-box: fill-box; transform-origin: top center;" />
    <polygon points="-5,46 5,46 0,55" fill="#ffffff" />
  </g>

  <!-- Ground Shadow Ripple -->
  <ellipse cx="0" cy="115" rx="28" ry="4" fill="#06b6d4" opacity="0.25" style="animation: shadowRipple 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center;" />
</g>
```

### Keyframe Styles:
```css
@keyframes botHover {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes thrusterFlicker {
  0% { transform: scaleY(0.75) scaleX(0.85); opacity: 0.7; }
  100% { transform: scaleY(1.25) scaleX(1.15); opacity: 1; }
}
@keyframes beaconPulse {
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #fbbf24); }
  50% { opacity: 0.2; filter: none; }
}
@keyframes shadowRipple {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(0.65); opacity: 0.12; }
}
```

---

## 2. Character 2: Pixel Developer (At Dual-Screen Workstation)

### Visual Features:
- Dark-wood developer desk with keyboard, dual angled CRT screens, and mug
- Developer in hoodie typing at mechanical keyboard with alternating hand taps
- Glowing monitor displays showing animated matrix code lines
- Gentle steam curls rising from the coffee mug

### Vector Markup:
```xml
<g id="pixel-dev" transform="translate(180, 85)">
  <!-- Developer Chair & Body -->
  <rect x="-14" y="30" width="28" height="34" rx="8" fill="#1e1b4b" stroke="#312e81" stroke-width="1.5" />
  
  <!-- Head & Hoodie -->
  <circle cx="0" cy="16" r="14" fill="#312e81" />
  <circle cx="0" cy="18" r="9" fill="#fcd34d" />
  <!-- Cyan Visor Glasses -->
  <rect x="-8" y="14" width="16" height="5" rx="2" fill="#06b6d4" />
  <!-- Headphones -->
  <rect x="-13" y="13" width="3" height="10" rx="1.5" fill="#38bdf8" />
  <rect x="10" y="13" width="3" height="10" rx="1.5" fill="#38bdf8" />

  <!-- Animated Typing Hands -->
  <circle cx="-6" cy="46" r="3.5" fill="#fcd34d" style="animation: typeHandLeft 0.35s ease-in-out infinite alternate; transform-box: fill-box;" />
  <circle cx="6" cy="46" r="3.5" fill="#fcd34d" style="animation: typeHandRight 0.35s ease-in-out infinite alternate; animation-delay: 0.18s; transform-box: fill-box;" />

  <!-- Workstation Desk Surface -->
  <rect x="-65" y="48" width="130" height="7" rx="3.5" fill="#18181b" stroke="#27272a" stroke-width="1" />
  <rect x="-58" y="55" width="6" height="45" fill="#27272a" />
  <rect x="52" y="55" width="6" height="45" fill="#27272a" />

  <!-- Coffee Mug & Steam -->
  <rect x="36" y="38" width="9" height="10" rx="2" fill="#0284c7" />
  <path d="M45,41 Q49,43 45,47" stroke="#0284c7" stroke-width="1.5" fill="none" />
  <path d="M38,34 Q40,30 38,26" stroke="#94a3b8" stroke-width="1.2" fill="none" opacity="0.6" style="animation: steamDrift 2.2s infinite ease-out; transform-box: fill-box;" />

  <!-- Dual Glowing Monitors -->
  <!-- Left Monitor -->
  <rect x="-56" y="18" width="32" height="24" rx="4" fill="#090d16" stroke="#0284c7" stroke-width="1.2" />
  <line x1="-50" y1="24" x2="-28" y2="24" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="3 2" style="animation: codeScroll 1.4s linear infinite;" />
  <line x1="-50" y1="29" x2="-34" y2="29" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4 2" />
  <line x1="-50" y1="34" x2="-30" y2="34" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="2 2" />

  <!-- Right Monitor -->
  <rect x="-20" y="18" width="34" height="24" rx="4" fill="#090d16" stroke="#a855f7" stroke-width="1.2" />
  <line x1="-14" y1="23" x2="8" y2="23" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3 3" />
  <line x1="-14" y1="28" x2="4" y2="28" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 1" style="animation: codeScroll 1.8s linear infinite;" />
  <line x1="-14" y1="33" x2="2" y2="33" stroke="#eab308" stroke-width="1.5" stroke-dasharray="3 2" />
</g>
```

### Keyframe Styles:
```css
@keyframes typeHandLeft {
  0% { transform: translateY(0); }
  100% { transform: translateY(-3px); }
}
@keyframes typeHandRight {
  0% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
}
@keyframes steamDrift {
  0% { transform: translateY(0) scaleX(1); opacity: 0.6; }
  100% { transform: translateY(-10px) scaleX(1.5); opacity: 0; }
}
@keyframes codeScroll {
  to { stroke-dashoffset: -20; }
}
```

---

## 3. Character 3: Ninja Coder (Stealth Cyber Shinobi)

### Visual Features:
- Crouched combat stance with dark stealth armor
- Trailing red headband ribbons fluttering in the wind
- Back-mounted katana with razor-thin traveling gleam reflection
- Glowing cyan eyes with menacing pulse

### Keyframe Styles:
```css
@keyframes ribbonFlutter {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-14deg) scaleY(1.1); }
}
@keyframes bladeGlint {
  0%, 80% { opacity: 0; transform: translateX(-30px); }
  85%, 95% { opacity: 1; transform: translateX(25px); }
  100% { opacity: 0; transform: translateX(30px); }
}
```

---

## 4. How to Design Any New Custom Character

Follow this 5-layer anchor framework to create robots, wizards, animals, or mascots:

```
[Layer 5: Foreground Actions]   Tools, spark bursts, floating HUD, typing hands, speech bubble
[Layer 4: Head & Accessories]  Eyes, helmet/hair, visor, glasses, hat, antenna beacon
[Layer 3: Torso & Limbs]       Hoodie, armor, robe, tunic, belt, arms
[Layer 2: Station Props]       Desk, podium, vehicle chassis, welding truss, runes
[Layer 1: Ground Baseline]     Base shadow ellipse, floor ripple, reflection
```

Always assign `transform-box: fill-box; transform-origin: center;` to any moving sub-group to prevent runaway displacement.
