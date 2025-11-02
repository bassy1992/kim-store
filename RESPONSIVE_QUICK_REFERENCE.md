# 📱 Responsive Design Quick Reference

## Breakpoints (Mobile-First)

```
📱 xs:  ≥475px  (Large phones)
📱 sm:  ≥640px  (Small tablets)
💻 md:  ≥768px  (Tablets)
🖥️ lg:  ≥1024px (Laptops)
🖥️ xl:  ≥1280px (Desktops)
🖥️ 2xl: ≥1536px (Large screens)
```

## Common Patterns

### Heights
```tsx
h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px]
```

### Typography
```tsx
// Headings
text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl

// Body
text-sm xs:text-base sm:text-lg md:text-xl

// Small text
text-xs xs:text-sm sm:text-base
```

### Spacing
```tsx
// Padding
px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12
py-4 xs:py-6 sm:py-8 md:py-12

// Gaps
gap-2 xs:gap-3 sm:gap-4 md:gap-6
space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6
```

### Layout
```tsx
// Flex direction
flex-col xs:flex-row

// Grid columns
grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4

// Alignment
text-center sm:text-left
items-center sm:items-start
justify-center sm:justify-start
```

### Buttons
```tsx
// Size
px-4 py-3 xs:px-5 xs:py-4 sm:px-6 sm:py-5 md:px-8 md:py-6

// Width
w-full xs:w-auto

// Text
text-xs xs:text-sm sm:text-base md:text-lg
```

### Icons
```tsx
w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
```

### Visibility
```tsx
// Hide on mobile, show on desktop
hidden md:block

// Show on mobile, hide on desktop
block md:hidden
```

## Testing Checklist

- [ ] 375px - iPhone SE (smallest common)
- [ ] 390px - iPhone 12/13/14
- [ ] 414px - iPhone Pro Max
- [ ] 768px - iPad
- [ ] 1024px - Laptop
- [ ] 1440px - Desktop

## Quick Test Command

Open Chrome DevTools:
1. Press `F12`
2. Press `Ctrl+Shift+M` (toggle device toolbar)
3. Test all sizes

## Your Project Status ✅

✅ Viewport meta tag configured
✅ Mobile-first Tailwind setup
✅ Custom `xs:` breakpoint added (475px)
✅ Responsive images
✅ Touch-friendly buttons (44px minimum)
✅ Proper spacing scales
✅ Typography scales correctly

## Remember

1. **Start mobile** - Design for 375px first
2. **Scale up** - Add breakpoints as needed
3. **Test real devices** - Not just DevTools
4. **Touch targets** - 44×44px minimum
5. **Performance** - Optimize images
