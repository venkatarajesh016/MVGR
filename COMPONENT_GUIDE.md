# Component Guide

## Component Architecture

```
Home (Main Page)
├── TopNavBar
├── MapView
│   ├── Mapbox Map
│   ├── Building Markers
│   ├── Room Markers
│   ├── Landmark Markers
│   ├── User Location Marker
│   └── Route Layer
├── SearchBar
│   └── Search Results Dropdown
├── FloatingActionButtons
├── InfoDrawer (conditional)
├── NavigationPanel (conditional)
└── Legend
```

## Component Props

### TopNavBar
```javascript
<TopNavBar campusName="Campus Navigator" />
```

### MapView
```javascript
<MapView
  mapboxToken={string}
  buildings={array}
  rooms={array}
  landmarks={array}
  selectedLocation={object}
  userLocation={object}
  route={object}
/>
```

### SearchBar
```javascript
<SearchBar
  onSearch={function}
  onResultSelect={function}
/>
```

### InfoDrawer
```javascript
<InfoDrawer
  item={object}
  type={string}
  onClose={function}
  onNavigate={function}
/>
```

### NavigationPanel
```javascript
<NavigationPanel
  destination={object}
  distance={number}
  onNavigate={function}
  onClear={function}
/>
```

### FloatingActionButtons
```javascript
<FloatingActionButtons
  onLocate={function}
  onLayersToggle={function}
/>
```

## State Management

### Home Component State
- `mapboxToken`: Mapbox API token
- `buildings`: Array of building objects
- `rooms`: Array of room objects
- `landmarks`: Array of landmark objects
- `userLocation`: { lat, lng }
- `selectedLocation`: { lat, lng, name, description }
- `selectedItem`: Full item object
- `selectedType`: 'building' | 'room' | 'landmark'
- `route`: GeoJSON route object
- `distance`: Number in meters
- `loading`: Boolean
- `showDrawer`: Boolean

## API Integration

### services/api.js
```javascript
api.getMapboxToken()
api.getBuildings()
api.getRooms()
api.getLandmarks()
api.search(query)
api.getRoute(startLat, startLng, endLat, endLng)
api.createBuilding(formData)
api.uploadCSV(file)
```

## Styling Classes

### Custom Tailwind Classes
- `glass-effect`: Glass morphism background
- `gradient-text`: Gradient text effect
- `pulse-marker`: Pulse animation
- `smooth-transition`: Smooth transitions

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Animation Variants

### Framer Motion Presets
```javascript
// Slide up from bottom
initial={{ y: '100%' }}
animate={{ y: 0 }}
exit={{ y: '100%' }}

// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}

// Stagger children
transition={{ delay: index * 0.05 }}
```

## Icon Usage

### Lucide React Icons
- `Search`: Search functionality
- `MapPin`: Location markers
- `Navigation`: Navigate button
- `Building2`: Building icon
- `DoorOpen`: Room icon
- `X`: Close button
- `Loader2`: Loading spinner
- `Clock`: Time display
- `TrendingUp`: Distance display

## Best Practices

1. Use `motion` components for animations
2. Implement loading states
3. Handle errors gracefully
4. Optimize re-renders with React.memo
5. Clean up map layers on unmount
6. Debounce search inputs
7. Use semantic HTML
8. Add ARIA labels
9. Test on mobile devices
10. Optimize images before upload
