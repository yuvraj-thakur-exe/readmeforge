#!/usr/bin/env python3
"""
Generates an animated, seamless-loop WebP and GIF from hero-forge.jpg
with glowing forge embers, pulsing circuit energy, and a holographic scanline sweep.
"""

import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import os

def create_animation():
    input_path = "d:/profile genrater/public/assets/hero-forge.jpg"
    output_webp = "d:/profile genrater/public/assets/hero-animated.webp"
    output_gif = "d:/profile genrater/public/assets/hero-animated.gif"

    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    base_raw = Image.open(input_path).convert("RGBA")
    
    # Scale to 960 width for great balance of retina sharpness and lightweight size
    target_w = 960
    target_h = int(base_raw.height * (target_w / base_raw.width))
    base = base_raw.resize((target_w, target_h), Image.Resampling.LANCZOS)
    base_arr = np.array(base, dtype=np.float32)

    total_frames = 24
    fps = 16
    frame_duration_ms = int(1000 / fps)

    # Coordinates relative to 960x536
    # Anvil spark center is roughly around x=520, y=380 in 960x536
    anvil_x = int(target_w * 0.54)
    anvil_y = int(target_h * 0.70)

    # Pre-generate 35 ember particle paths
    np.random.seed(42)
    particles = []
    num_particles = 40
    for i in range(num_particles):
        spawn_x = anvil_x + np.random.uniform(-90, 70)
        spawn_y = anvil_y + np.random.uniform(-30, 20)
        vx = np.random.uniform(-1.2, 1.8)
        vy = np.random.uniform(-3.5, -7.0)
        size = np.random.uniform(2.0, 5.0)
        # Random hue: golden orange or electric cyan
        is_cyan = np.random.rand() > 0.65
        color = (80, 240, 255) if is_cyan else (255, 190, 60)
        phase = np.random.uniform(0.0, 1.0)
        particles.append({
            'x': spawn_x, 'y': spawn_y, 'vx': vx, 'vy': vy,
            'size': size, 'color': color, 'phase': phase
        })

    frames = []

    # Grid for coordinate-based effects
    Y, X = np.ogrid[:target_h, :target_w]

    # Pre-compute distance from anvil center for pulsing glow
    dist_from_anvil = np.sqrt((X - anvil_x)**2 + (Y - anvil_y)**2)
    anvil_glow_mask = np.clip(1.0 - (dist_from_anvil / 220.0), 0.0, 1.0) ** 2

    # High-intensity circuit glow filter
    cyan_circuit_mask = (base_arr[:, :, 2] > 180) & (base_arr[:, :, 0] < 120)

    print(f"Generating {total_frames} animated frames...")

    for f in range(total_frames):
        t = f / float(total_frames)  # 0.0 to 1.0
        
        # 1. Pulsing sine wave for energy core
        pulse = 0.5 + 0.5 * math.sin(2.0 * math.pi * t)
        pulse_secondary = 0.5 + 0.5 * math.sin(4.0 * math.pi * t + 0.5)

        # 2. Base frame with luminous energy surge
        frame_arr = base_arr.copy()
        
        # Boost anvil glow (golden/orange/cyan sparks)
        glow_add = anvil_glow_mask[:, :, None] * np.array([50, 40, 15, 0]) * pulse
        frame_arr[:, :, :3] += glow_add[:, :, :3]

        # Subtle neon armor line pulsation
        frame_arr[cyan_circuit_mask, 0] += 20 * pulse_secondary
        frame_arr[cyan_circuit_mask, 1] += 35 * pulse_secondary
        frame_arr[cyan_circuit_mask, 2] += 45 * pulse_secondary

        # 3. Holographic laser scanline sweep (sweeps vertically across image)
        scan_y = (t * target_h * 1.2) % (target_h * 1.2) - (target_h * 0.1)
        scan_dist = np.abs(Y - scan_y)
        scan_intensity = np.clip(1.0 - (scan_dist / 35.0), 0.0, 1.0) ** 3
        scan_glow = scan_intensity[:, :, None] * np.array([25, 60, 90, 0])
        frame_arr[:, :, :3] += scan_glow[:, :, :3]

        # Clip values to 0..255
        frame_arr = np.clip(frame_arr, 0, 255).astype(np.uint8)
        frame_img = Image.fromarray(frame_arr, mode="RGBA")

        # 4. Draw particle sparks on overlay with Pillow
        spark_layer = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(spark_layer)

        for p in particles:
            # Particle progress in loop
            progress = (t + p['phase']) % 1.0
            cur_x = p['x'] + p['vx'] * (progress * 50) + math.sin(progress * 6.28) * 8
            cur_y = p['y'] + p['vy'] * (progress * 50)
            
            # Fade in quickly, then fade out
            if progress < 0.2:
                alpha = int(255 * (progress / 0.2))
            else:
                alpha = int(255 * (1.0 - (progress - 0.2) / 0.8))

            r, g, b = p['color']
            sz = p['size'] * (1.0 - progress * 0.4)
            
            # Outer soft aura
            draw.ellipse([cur_x - sz * 1.8, cur_y - sz * 1.8, cur_x + sz * 1.8, cur_y + sz * 1.8],
                         fill=(r, g, b, int(alpha * 0.35)))
            # Bright core
            draw.ellipse([cur_x - sz * 0.7, cur_y - sz * 0.7, cur_x + sz * 0.7, cur_y + sz * 0.7],
                         fill=(255, 255, 255, alpha))

        # Composite particle sparks
        composite = Image.alpha_composite(frame_img, spark_layer)
        frames.append(composite.convert("RGB"))

    print(f"Saving animated WebP to {output_webp}...")
    frames[0].save(
        output_webp,
        save_all=True,
        append_images=frames[1:],
        duration=frame_duration_ms,
        loop=0,
        quality=88,
        method=4
    )
    webp_size = os.path.getsize(output_webp) / (1024 * 1024)
    print(f"Animated WebP saved successfully: {webp_size:.2f} MB")

    print(f"Saving animated GIF to {output_gif}...")
    # Quantize frames to common palette for clean GIF
    gif_frames = [f.convert("P", palette=Image.Palette.ADAPTIVE, colors=128) for f in frames]
    gif_frames[0].save(
        output_gif,
        save_all=True,
        append_images=gif_frames[1:],
        duration=frame_duration_ms,
        loop=0,
        optimize=True
    )
    gif_size = os.path.getsize(output_gif) / (1024 * 1024)
    print(f"Animated GIF saved successfully: {gif_size:.2f} MB")

if __name__ == "__main__":
    create_animation()
