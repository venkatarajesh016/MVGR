# Visual Design Guide

## Design Philosophy

The Campus Navigation System follows modern design principles inspired by leading navigation apps like Google Maps and Uber. The interface prioritizes clarity, ease of use, and visual appeal.

## Color System

### Primary Colors
```
Blue (#2563EB)    ████████  Buildings, Primary Actions
Green (#10B981)   ████████  Rooms, Success States
Amber (#F59E0B)   ████████  Landmarks, Warnings
Red (#EF4444)     ████████  User Location, Alerts
```

### Neutral Colors
```
Gray 900 (#1F2937) ████████  Primary Text
Gray 600 (#6B7280) ████████  Secondary Text
Gray 400 (#9CA3AF) ████████  Disabled States
Gray 100 (#F3F4F6) ████████  Backgrounds
White (#FFFFFF)    ████████  Cards, Panels
```

## Typography Scale

```
Heading XL    24px / 700  Page Titles
Heading L     20px / 700  Section Headers
Heading M     18px / 600  Card Titles
Body L        16px / 500  Primary Text
Body M        14px / 400  Secondary Text
Body S        13px / 400  Helper Text
Caption       12px / 400  Labels, Tags
```

## Spacing System

```
4px   ▪        Tight spacing
8px   ▪▪       Small gaps
12px  ▪▪▪      Medium gaps
16px  ▪▪▪▪     Standard padding
24px  ▪▪▪▪▪▪   Large padding
32px  ▪▪▪▪▪▪▪▪ Section spacing
```

## Component Anatomy

### Search Bar
```
┌─────────────────────────────────────────┐
│ 🔍  Search buildings, rooms...      ✕  │ ← Glass effect background
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ BUILDINGS                               │
│ 🏢  Academic Block A                    │ ← Hover: Blue background
│     Main engineering building           │
│ 🏢  Library                             │
│     Central library with study halls    │
│                                         │
│ ROOMS                                   │
│ 🚪  Room 101                            │ ← Hover: Green background
│     Academic Block A • Floor 1 • CS     │
└─────────────────────────────────────────┘
```

### Info Drawer
```
┌─────────────────────────────────────────┐
│                                      ✕  │
│ 🏢  Academic Block A                    │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │ ← Building image
│ │         [Building Photo]            │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Main engineering building with modern   │
│ facilities and computer labs.           │
│                                         │
│ 📍 18.2351, 83.4126                     │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │     🧭  Navigate Here               │ │ ← Gradient button
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Navigation Panel
```
┌─────────────────────────────────────────┐
│ Academic Block A                     ✕  │
│ Main engineering building               │
│                                         │
│ ┌──────────────┬──────────────────────┐ │
│ │ 📈 Distance  │  ⏱️  Est. Time       │ │ ← Info cards
│ │    250m      │     3 min            │ │
│ └──────────────┴──────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │     🧭  Start Navigation            │ │ ← Primary action
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Map Markers

```
Buildings:  ⭕ 🏢  (32px, Blue)
Rooms:      ⭕ 🚪  (24px, Green)
Landmarks:  ⭕ 📍  (28px, Amber)
User:       ⭕ 💫  (20px, Red, Pulsing)
```

## Animation Timing

### Duration
```
Fast:     150ms   Button hover, icon changes
Normal:   300ms   Panel slides, fades
Slow:     500ms   Page transitions
Custom:   1500ms  Map flyTo animations
```

### Easing
```
Ease Out:     cubic-bezier(0, 0, 0.2, 1)     Default
Ease In Out:  cubic-bezier(0.4, 0, 0.2, 1)   Smooth
Spring:       damping: 30, stiffness: 300    Bouncy
```

## Shadow System

```
Small:   0 1px 3px rgba(0,0,0,0.1)           Subtle depth
Medium:  0 4px 12px rgba(0,0,0,0.1)          Cards
Large:   0 10px 40px rgba(0,0,0,0.15)        Modals
XLarge:  0 20px 60px rgba(0,0,0,0.2)         Drawers
```

## Border Radius

```
Small:   8px    Buttons, inputs
Medium:  12px   Cards, popups
Large:   16px   Panels
XLarge:  24px   Drawers
Round:   50%    Markers, avatars
```

## Iconography

### Icon Sizes
```
Small:   16px   Inline icons
Medium:  20px   Button icons
Large:   24px   Feature icons
XLarge:  32px   Hero icons
```

### Icon Style
- Lucide React icon set
- 2px stroke width
- Rounded corners
- Consistent sizing
- Semantic colors

## Responsive Breakpoints

```
Mobile:     < 768px    Single column, bottom nav
Tablet:     768-1024px Two columns, side nav
Desktop:    > 1024px   Multi-column, full features
```

## Accessibility

### Color Contrast
```
Text on White:     4.5:1 minimum (WCAG AA)
Large Text:        3:1 minimum
Interactive:       3:1 minimum
Focus Indicators:  3:1 minimum
```

### Touch Targets
```
Minimum:  44x44px   All interactive elements
Optimal:  48x48px   Primary actions
Spacing:  8px       Between targets
```

## Glass Morphism Effect

```css
background: rgba(255, 255, 255, 0.95)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.2)
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
```

## Gradient Styles

### Primary Gradient
```css
background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)
```

### Success Gradient
```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%)
```

### Accent Gradient
```css
background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%)
```

## State Variations

### Button States
```
Default:   Blue background, white text
Hover:     Darker blue, scale 1.02
Active:    Even darker, scale 0.98
Disabled:  Gray background, reduced opacity
Loading:   Spinner, disabled state
```

### Input States
```
Default:   Gray border, white background
Focus:     Blue border, blue ring
Error:     Red border, red text
Success:   Green border, green icon
Disabled:  Gray background, no interaction
```

## Layout Grid

```
Mobile:    4px grid, 16px margins
Tablet:    8px grid, 24px margins
Desktop:   8px grid, 32px margins
```

## Z-Index Scale

```
Base:      0     Map, background
Markers:   10    Map markers
Controls:  20    Top nav, bottom nav
Overlay:   30    Search, panels
Drawer:    40    Info drawer backdrop
Modal:     50    Info drawer content
Toast:     60    Notifications
```

## Best Practices

### Do's ✓
- Use consistent spacing
- Apply glass effect to floating elements
- Add smooth animations
- Provide visual feedback
- Use semantic colors
- Optimize for mobile first
- Test with real content
- Ensure accessibility

### Don'ts ✗
- Mix different design patterns
- Use too many colors
- Overuse animations
- Ignore mobile users
- Forget loading states
- Skip error handling
- Use tiny touch targets
- Ignore accessibility

## Design Tokens

```javascript
// colors.js
export const colors = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  danger: '#EF4444',
  gray: {
    900: '#1F2937',
    600: '#6B7280',
    400: '#9CA3AF',
    100: '#F3F4F6'
  }
};

// spacing.js
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
};

// typography.js
export const typography = {
  fontFamily: 'Inter, sans-serif',
  sizes: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px'
  }
};
```

## Component Checklist

When creating new components:
- [ ] Responsive design
- [ ] Hover states
- [ ] Focus states
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Animations
- [ ] Accessibility
- [ ] Mobile optimization
- [ ] Dark mode ready (future)

---

This visual guide ensures consistency across the entire Campus Navigation System.
