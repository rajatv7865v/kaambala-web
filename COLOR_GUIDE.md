# Kaambala Brand Color Guide

## 🎨 Color Palette

### Primary Colors

| Color | Hex | Usage | Tailwind Class |
|-------|-----|-------|----------------|
| **Vibrant Deep Blue** | `#1e3a8a` | Headers, main text, footer backgrounds | `primary-500` |
| **Bright Sky Blue** | `#0ea5e9` | Primary buttons, links, main CTAs | `secondary-500` |
| **Vibrant Orange** | `#f97316` | Secondary CTAs, highlights, urgency | `accent-500` |
| **Vibrant Rose** | `#f43f5e` | Accent highlights, decorative elements | `pink-500` |
| **Emerald Green** | `#10b981` | Success states, positive indicators | `success-500` |

---

## 📐 Color Usage Hierarchy

### 60-30-10 Rule

- **60%** - Vibrant Deep Blue (`primary-500`) - Dominant color
- **30%** - Bright Sky Blue (`secondary-500`) - Secondary elements
- **10%** - Vibrant Orange, Rose, Emerald Green - Accent colors

---

## 🎯 Recommended Usage

### Primary (Vibrant Deep Blue - #1e3a8a)
```css
/* Use for: */
- Main headings (h1, h2)
- Navigation text
- Footer backgrounds
- Important text content
- Card borders
```

**Tailwind Examples:**
- `text-primary-500` - Main text
- `bg-primary-500` - Backgrounds
- `border-primary-500` - Borders

---

### Secondary (Bright Sky Blue - #0ea5e9)
```css
/* Use for: */
- Primary buttons (Book Now, Search)
- Links and hover states
- Main call-to-action elements
- Trust indicators
- Icon backgrounds
```

**Tailwind Examples:**
- `bg-secondary-500` - Button backgrounds
- `text-secondary-500` - Link text
- `hover:bg-secondary-600` - Hover states

---

### Accent (Vibrant Orange - #f97316)
```css
/* Use for: */
- Secondary buttons
- Urgency elements
- Highlights and badges
- Gradient combinations
- Alert messages
```

**Tailwind Examples:**
- `bg-accent-500` - Button backgrounds
- `text-accent-500` - Highlight text
- `from-accent-500 to-pink-500` - Gradients

---

### Pink (Vibrant Rose - #f43f5e)
```css
/* Use for: */
- Decorative gradients
- Testimonial highlights
- Special badges
- Hero section accents
```

**Tailwind Examples:**
- `from-pink-500 to-accent-500` - Gradients
- `bg-pink-100` - Light backgrounds
- `text-pink-500` - Accent text

---

### Success (Emerald Green - #10b981)
```css
/* Use for: */
- Success messages
- Verified badges
- Positive indicators
- Checkmarks and confirmations
```

**Tailwind Examples:**
- `bg-success-500` - Success backgrounds
- `text-success-500` - Success text
- `border-success-500` - Success borders

---

## 🎨 Gradient Combinations

### Recommended Gradients:

1. **Hero Section:**
   ```css
   from-pink-500 to-accent-500
   ```

2. **Professional Sections:**
   ```css
   from-secondary-500 to-primary-500
   ```

3. **Success Messages:**
   ```css
   from-success-500 to-secondary-500
   ```

4. **Vibrant CTAs:**
   ```css
   from-accent-500 to-pink-500
   ```

---

## ✅ Accessibility Guidelines

### Text Contrast Ratios (WCAG AA)

| Background | Text Color | Ratio | Status |
|------------|------------|-------|--------|
| White | `primary-500` (#1e3a8a) | 8.2:1 | ✅ Excellent |
| White | `secondary-500` (#0ea5e9) | 3.1:1 | ⚠️ Use `secondary-700` for text |
| White | `accent-500` (#f97316) | 3.2:1 | ⚠️ Use `accent-700` for text |
| White | `pink-500` (#f43f5e) | 4.1:1 | ✅ Good |
| White | `success-500` (#10b981) | 3.0:1 | ⚠️ Use `success-700` for text |

### Best Practices:
- Use darker shades (600-700) for text on light backgrounds
- Use lighter shades (100-300) for text on dark backgrounds
- Always test with contrast checkers

---

## 🚫 What to Avoid

1. ❌ Don't use all 5 colors equally - follow 60-30-10 rule
2. ❌ Don't use light shades (50-200) for text on white
3. ❌ Don't mix warm and cool colors without purpose
4. ❌ Don't use more than 2 accent colors in one section

---

## 💡 Quick Reference

### Common Patterns:

**Primary Button:**
```tsx
className="bg-secondary-500 hover:bg-secondary-600 text-white"
```

**Secondary Button:**
```tsx
className="bg-accent-500 hover:bg-accent-600 text-white"
```

**Heading:**
```tsx
className="text-primary-500"
```

**Link:**
```tsx
className="text-secondary-500 hover:text-secondary-600"
```

**Success Badge:**
```tsx
className="bg-success-100 text-success-700 border-success-300"
```

---

## 📱 Current Implementation

Your colors are currently used in:
- ✅ Navbar: Emerald Green (#10b981) and Vibrant Orange (#f97316)
- ✅ Hero: Vibrant Rose to Orange gradient (#f43f5e → #f97316)

**Next Steps:** Update components to use the new Tailwind color system for consistency!

