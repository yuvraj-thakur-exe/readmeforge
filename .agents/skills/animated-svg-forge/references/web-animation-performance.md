# 60fps Web Animation & Performance Standards

Reference: [sergey-pimenov/awesome-web-animation](https://github.com/sergey-pimenov/awesome-web-animation) (Curated list of web animation libraries, SVG animations, CSS animations, and GPU acceleration rules)

---

## 1. The GPU-Composite Golden Rule

When animating SVGs inside web browsers and GitHub markdown:
- **ONLY animate composite properties:** `transform` (`translate`, `scale`, `rotate`) and `opacity`.
- **Avoid animating layout properties:** `width`, `height`, `x`, `y`, `cx`, `cy`, `r`, `top`, `left`. Animating layout triggers continuous CPU re-layout and browser repainting.
- If you must animate path strokes or sizes, use `stroke-dashoffset` or transform scales:
  ```css
  /* HIGH PERFORMANCE (60 FPS GPU Composite) */
  @keyframes badgeFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-6px) scale(1.02); }
  }

  /* ACCELERATE WITH WILL-CHANGE */
  .anim-element {
    will-change: transform, opacity;
  }
  ```

---

## 2. Organic Timing Functions & Bezier Curves

Replace browser default `ease` or `linear` with custom spring and ease-out cubic-bezier curves for a natural, snappy feeling:

| Easing Vibe | CSS Cubic-Bezier | Best Used For |
| :--- | :--- | :--- |
| **Snappy Tech Spring** | `cubic-bezier(0.16, 1, 0.3, 1)` | Card reveals, slide-ins, popups |
| **Smooth Ambient Wave**| `cubic-bezier(0.4, 0, 0.2, 1)` | Continuous loops, particle floats |
| **Energetic Bounce** | `cubic-bezier(0.34, 1.56, 0.64, 1)`| Achievement unlocks, trophies |
| **Precision Ease-In-Out**| `cubic-bezier(0.65, 0, 0.35, 1)` | Scanlines, radar sweeps |

---

## 3. High-Performance SVG Stroke Path Drawing

Draw SVG borders, signatures, or logos smoothly using `pathLength="1"`:

```xml
<path d="M 20 80 Q 200 10 400 80 T 780 80"
      fill="none" stroke="#22d3ee" stroke-width="2"
      pathLength="1"
      stroke-dasharray="1"
      stroke-dashoffset="1">
  <animate attributeName="stroke-dashoffset"
           from="1" to="0" dur="2.4s"
           fill="freeze"
           calcMode="spline"
           keySplines="0.16 1 0.3 1" />
</path>
```

---

## 4. Accessibility & Reduced Motion Standard

Always include an a11y reduced-motion query inside every SVG `<style>` block:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
This ensures users with vestibular motion sensitivity can comfortably view your profile without disorienting loops.
