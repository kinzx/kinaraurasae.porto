# 📦 Asset Guidelines — Portfolio CI/CD

Best practices for handling heavy custom assets (SVG, Lottie, WebP) in the CI pipeline to prevent build timeouts and maintain visual fidelity.

## Asset Size Budgets

| Asset Type | Max Per File | Notes |
|------------|-------------|-------|
| SVG (icons/logos) | 50 KB | Optimize with SVGO |
| SVG (illustrations) | 200 KB | Consider converting to WebP if larger |
| WebP (photos) | 500 KB | Use quality 80-85 for visual balance |
| AVIF (photos) | 300 KB | Preferred over WebP when supported |
| Lottie JSON | 300 KB | Minify JSON, reduce keyframes |
| Custom fonts (woff2) | 100 KB per weight | Subset to required glyphs only |
| **Total `/public`** | **50 MB** | CI will fail if exceeded |

## Optimization Workflow

### SVG Optimization
```bash
# Install SVGO globally
npm install -g svgo

# Optimize a single file
svgo input.svg -o output.svg

# Optimize all SVGs in public/
svgo -f public/ --recursive

# Recommended SVGO config (create svgo.config.js):
module.exports = {
  plugins: [
    'preset-default',
    'removeDimensions',
    { name: 'removeViewBox', active: false },
    'sortAttrs',
  ],
};
```

### WebP/AVIF Conversion
```bash
# Using Sharp (already available via Next.js)
# Or install cwebp for batch conversion:
# Arch: pacman -S libwebp
# macOS: brew install webp
# Ubuntu: apt-get install webp

# Convert PNG to WebP (quality 85)
cwebp -q 85 input.png -o output.webp

# Batch convert all PNGs
for f in public/images/*.png; do
  cwebp -q 85 "$f" -o "${f%.png}.webp"
done
```

### Lottie Optimization
```bash
# Use lottie-minify or manually:
# 1. Remove unused layers
# 2. Reduce decimal precision (2-3 decimals is fine)
# 3. Remove metadata/comments from JSON
# 4. Compress with: npx json-minify animation.json > animation.min.json
```

### Font Subsetting
```bash
# Install glyphhanger
npm install -g glyphhanger

# Subset to Latin characters only
glyphhanger --whitelist="U+0000-00FF" --subset=font.woff2

# Or use Google Fonts with next/font (auto-subsetted!)
# This is the recommended approach — Next.js handles it automatically.
```

## Git LFS Recommendation

For assets larger than 1 MB, use Git LFS to keep the repository lightweight:

```bash
# Install Git LFS
git lfs install

# Track large asset types
git lfs track "*.psd"
git lfs track "*.ai"
git lfs track "*.sketch"
git lfs track "public/videos/*.mp4"
git lfs track "public/images/*.png"  # If PNGs are large originals

# Verify tracking
git lfs ls-files
```

## CI Integration Notes

1. **Asset size check** runs automatically in CI (see `.github/workflows/ci.yml` → `build` job)
2. The 50 MB budget is configurable — edit `MAX_SIZE` in the CI workflow
3. Next.js Image component automatically optimizes images at runtime via `next/image`
4. For static exports, pre-optimize all images before committing

## Do NOT Commit

- Source PSD/AI/Sketch files (use Git LFS or keep outside repo)
- Uncompressed video files
- Raw/unoptimized photography (>2 MB per image)
- Duplicate assets at different resolutions (let Next.js handle responsive images)
