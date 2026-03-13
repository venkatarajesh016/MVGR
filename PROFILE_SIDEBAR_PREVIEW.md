# Profile Sidebar - Visual Preview

## Component Layout

```
┌─────────────────────────────────────────┐
│  ☰  Campus Navigator                    │  ← TopNavBar with Hamburger
└─────────────────────────────────────────┘

When hamburger clicked:

┌──────────────────┐┌─────────────────────┐
│                  ││                     │
│  ┌────────────┐  ││                     │
│  │   Avatar   │  ││   Main Content      │
│  │   (96px)   │  ││   (Dimmed)          │
│  └────────────┘  ││                     │
│                  ││                     │
│  Rajesh Kumar    ││                     │
│  CS21B1001       ││                     │
│                  ││                     │
│  🏢 MVGR College ││                     │
│  🎓 3rd Year CS  ││                     │
│  📞 +91 98765... ││                     │
│  ✉️  rajesh@...  ││                     │
│                  ││                     │
│  ───────────────  ││                     │
│                  ││                     │
│  🏠 Home       ›  ││                     │
│  📚 My Classes ›  ││                     │
│  🗺️  Campus Map ›  ││                     │
│  ⚙️  Settings   ›  ││                     │
│                  ││                     │
│  🚪 Logout     ›  ││                     │
│                  ││                     │
│  Campus Nav v1.0 ││                     │
│  © 2024          ││                     │
│                  ││                     │
└──────────────────┘└─────────────────────┘
   320px width        Backdrop overlay
   Slides from left   Click to close
```

## Color Scheme

### Profile Card (Top Section)
```
Background: Blue Gradient (#2563EB → #3B82F6)
Text: White (#FFFFFF)
Icons: Light Blue (#BFDBFE)
Avatar Border: White with shadow
Online Indicator: Green (#10B981)
```

### Navigation Menu
```
Background: White (#FFFFFF)
Text: Gray (#374151)
Hover Background: Light Blue (#EFF6FF)
Hover Text: Blue (#2563EB)
Icons: Gray → Blue on hover
```

### Logout Button
```
Hover Background: Light Red (#FEF2F2)
Hover Text: Red (#EF4444)
```

### Backdrop
```
Background: Black with 50% opacity
Blur effect on content behind
```

## Animations

### Sidebar Entry
```
Initial: x = -320px (off-screen left)
Animate: x = 0 (slide in)
Duration: ~0.4s
Type: Spring (natural bounce)
```

### Backdrop
```
Initial: opacity = 0
Animate: opacity = 1
Duration: 0.3s
Type: Fade
```

### Menu Items
```
Staggered animation:
Item 1: delay 0s
Item 2: delay 0.1s
Item 3: delay 0.2s
Item 4: delay 0.3s
Item 5: delay 0.4s
```

## Interactions

### Open Sidebar
- Click hamburger menu (☰)
- Sidebar slides in from left
- Backdrop fades in
- Menu items appear with stagger

### Close Sidebar
- Click X button (top-right of sidebar)
- Click anywhere on backdrop
- Sidebar slides out to left
- Backdrop fades out

### Menu Item Hover
- Background changes to light blue
- Text color changes to blue
- Icon color changes to blue
- Chevron (›) changes to blue
- Smooth transition (0.2s)

### Logout Hover
- Background changes to light red
- Text color changes to red
- Icon color changes to red
- Smooth transition (0.2s)

## Responsive Breakpoints

### Mobile (< 640px)
```
Sidebar: 320px (full overlay)
Profile Card: Full width
Menu Items: Full width
Font Size: Base (16px)
```

### Tablet (640px - 1024px)
```
Sidebar: 320px (partial overlay)
Profile Card: Full width
Menu Items: Full width
Font Size: Base (16px)
```

### Desktop (> 1024px)
```
Sidebar: 320px (partial overlay)
Profile Card: Full width
Menu Items: Full width
Font Size: Base (16px)
Hover effects: Enabled
```

## Component Hierarchy

```
Home.jsx
├── TopNavBar
│   └── Hamburger Button (☰)
│       └── onClick → setShowProfileSidebar(true)
│
└── ProfileSidebar (isOpen={showProfileSidebar})
    ├── Backdrop (onClick → close)
    ├── Sidebar Container
    │   ├── Close Button (X)
    │   ├── ProfileCard
    │   │   ├── Avatar
    │   │   ├── Name & ID
    │   │   └── Details (College, Year, Phone, Email)
    │   ├── Navigation Menu
    │   │   ├── Home
    │   │   ├── My Classes
    │   │   ├── Campus Map
    │   │   └── Settings
    │   ├── Logout Button
    │   └── Footer
    └── onClose → setShowProfileSidebar(false)
```

## Icon Reference

```
Profile Card:
- 👤 User (default avatar)
- 🟢 Online indicator
- 🏢 Building2 (college)
- 🎓 GraduationCap (year)
- 📞 Phone (phone number)
- ✉️  Mail (email)

Navigation Menu:
- 🏠 Home
- 📚 BookOpen (classes)
- 🗺️  Map (campus map)
- ⚙️  Settings
- 🚪 LogOut
- › ChevronRight (all items)
- ✕ X (close button)
```

## Spacing & Sizing

```
Sidebar:
- Width: 320px (w-80)
- Padding: 24px (p-6)
- Border Radius: 0 (sharp edges)

Profile Card:
- Padding: 24px (p-6)
- Border Radius: 16px (rounded-2xl)
- Avatar: 96px (w-24 h-24)
- Gap between items: 12px (gap-3)

Menu Items:
- Height: 48px (py-3)
- Padding: 16px horizontal (px-4)
- Border Radius: 12px (rounded-xl)
- Gap: 8px (space-y-2)
- Icon Size: 20px (w-5 h-5)

Close Button:
- Size: 40px (p-2 + icon)
- Position: Top-right (top-4 right-4)
- Border Radius: 50% (rounded-full)
```

## Z-Index Layers

```
z-50: Sidebar (top layer)
z-40: Backdrop (middle layer)
z-20: TopNavBar (below sidebar)
z-10: Other UI elements
z-0:  Map and content
```

## State Management

```javascript
// In Home.jsx
const [showProfileSidebar, setShowProfileSidebar] = useState(false);

// Open
<TopNavBar onMenuClick={() => setShowProfileSidebar(true)} />

// Close
<ProfileSidebar 
  isOpen={showProfileSidebar}
  onClose={() => setShowProfileSidebar(false)}
/>
```

## User Data Flow

```
Home.jsx
  ↓
userData object
  ↓
ProfileSidebar (user prop)
  ↓
ProfileCard (user prop)
  ↓
Display: name, studentId, college, year, phone, email, avatar
```

## Summary

✅ Clean, modern design
✅ Smooth animations
✅ Intuitive interactions
✅ Responsive layout
✅ Professional appearance
✅ Easy to customize

The sidebar provides a polished, app-like experience with smooth transitions and a clean interface!
