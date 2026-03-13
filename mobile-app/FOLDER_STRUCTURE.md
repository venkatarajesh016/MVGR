# Mobile App Folder Structure

## Complete Directory Layout

```
mobile-app/
│
├── 📄 App.js                          # Root component with navigation
├── 📄 app.json                        # Expo configuration
├── 📄 package.json                    # Dependencies and scripts
├── 📄 babel.config.js                 # Babel configuration
├── 📄 .gitignore                      # Git ignore rules
│
├── 📚 Documentation Files
│   ├── 📄 README.md                   # Complete project overview
│   ├── 📄 SETUP_GUIDE.md              # Installation and setup
│   ├── 📄 FEATURES_GUIDE.md           # Feature documentation
│   ├── 📄 IMPORTANT_NOTES.md          # Critical configuration
│   ├── 📄 PROJECT_SUMMARY.md          # Project overview
│   ├── 📄 QUICK_REFERENCE.md          # Quick lookup guide
│   └── 📄 FOLDER_STRUCTURE.md         # This file
│
└── 📁 src/                            # Source code directory
    │
    ├── 📁 screens/                    # Main screen components
    │   ├── 📄 MapScreen.js            # Main map and navigation
    │   ├── 📄 AuthScreen.js           # Login/signup screen
    │   └── 📄 DestinationScreen.js    # Building/room selection
    │
    ├── 📁 components/                 # Reusable UI components
    │   ├── 📄 NavigationPanel.js      # Floating guidance panel
    │   └── 📄 DestinationSelector.js  # Destination picker modal
    │
    ├── 📁 services/                   # API and external services
    │   └── 📄 api.js                  # Axios HTTP client
    │
    ├── 📁 utils/                      # Utility functions
    │   └── 📄 location.js             # GPS and location utilities
    │
    └── 📁 context/                    # React Context for state
        └── 📄 AuthContext.js          # Authentication context
```

---

## File Descriptions

### Root Level Files

| File | Purpose | Size |
|------|---------|------|
| `App.js` | Root component, navigation setup | ~150 lines |
| `app.json` | Expo configuration, permissions | ~50 lines |
| `package.json` | Dependencies, scripts | ~30 lines |
| `babel.config.js` | Babel transpiler config | ~10 lines |
| `.gitignore` | Git ignore rules | ~15 lines |

### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Complete overview | Everyone |
| `SETUP_GUIDE.md` | Installation steps | Developers |
| `FEATURES_GUIDE.md` | Feature details | Users/Developers |
| `IMPORTANT_NOTES.md` | Critical config | Developers |
| `PROJECT_SUMMARY.md` | Project overview | Project Managers |
| `QUICK_REFERENCE.md` | Quick lookups | Developers |
| `FOLDER_STRUCTURE.md` | This file | Everyone |

### Source Code Files

#### Screens (3 files)

**MapScreen.js** (~250 lines)
- Main navigation interface
- Map display with Leaflet
- Real-time location tracking
- Route calculation
- Waypoint markers
- Navigation panel integration

**AuthScreen.js** (~100 lines)
- Login/signup interface
- Form validation
- Token management
- Error handling

**DestinationScreen.js** (~120 lines)
- Building/room selection
- List navigation
- Search functionality
- Destination selection

#### Components (2 files)

**NavigationPanel.js** (~200 lines)
- Floating guidance panel
- Real-time updates
- Waypoint progress
- Distance calculation
- Instruction display

**DestinationSelector.js** (~150 lines)
- Destination picker modal
- Search functionality
- Building list
- Selection handling

#### Services (1 file)

**api.js** (~80 lines)
- Axios HTTP client
- API base URL configuration
- Request interceptors
- Token injection
- API endpoint definitions

#### Utils (1 file)

**location.js** (~100 lines)
- Location permission handling
- GPS tracking
- Distance calculation
- Location watching
- Haversine formula

#### Context (1 file)

**AuthContext.js** (~20 lines)
- Authentication context
- Auth methods definition
- State management setup

---

## File Statistics

### Code Files
- **Total Lines**: ~1,500
- **Screens**: 3 files (~470 lines)
- **Components**: 2 files (~350 lines)
- **Services**: 1 file (~80 lines)
- **Utils**: 1 file (~100 lines)
- **Context**: 1 file (~20 lines)
- **Config**: 4 files (~90 lines)

### Documentation Files
- **Total Lines**: ~2,000
- **README.md**: ~300 lines
- **SETUP_GUIDE.md**: ~250 lines
- **FEATURES_GUIDE.md**: ~400 lines
- **IMPORTANT_NOTES.md**: ~350 lines
- **PROJECT_SUMMARY.md**: ~300 lines
- **QUICK_REFERENCE.md**: ~200 lines

### Total Project
- **Code Files**: 8
- **Config Files**: 4
- **Documentation**: 7
- **Total Files**: 19
- **Total Lines**: ~3,500

---

## Directory Tree

```
mobile-app/
├── src/
│   ├── screens/
│   │   ├── MapScreen.js
│   │   ├── AuthScreen.js
│   │   └── DestinationScreen.js
│   ├── components/
│   │   ├── NavigationPanel.js
│   │   └── DestinationSelector.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── location.js
│   └── context/
│       └── AuthContext.js
├── App.js
├── app.json
├── package.json
├── babel.config.js
├── .gitignore
├── README.md
├── SETUP_GUIDE.md
├── FEATURES_GUIDE.md
├── IMPORTANT_NOTES.md
├── PROJECT_SUMMARY.md
├── QUICK_REFERENCE.md
└── FOLDER_STRUCTURE.md
```

---

## File Dependencies

### App.js depends on:
- `src/screens/MapScreen.js`
- `src/screens/AuthScreen.js`
- `src/screens/DestinationScreen.js`
- `src/context/AuthContext.js`

### MapScreen.js depends on:
- `src/components/NavigationPanel.js`
- `src/components/DestinationSelector.js`
- `src/services/api.js`
- `src/utils/location.js`

### NavigationPanel.js depends on:
- `src/utils/location.js`

### DestinationSelector.js depends on:
- No internal dependencies

### AuthScreen.js depends on:
- `src/context/AuthContext.js`

### DestinationScreen.js depends on:
- `src/services/api.js`

### api.js depends on:
- `axios` (external)
- `expo-secure-store` (external)

### location.js depends on:
- `expo-location` (external)

---

## Import Paths

### From MapScreen.js
```javascript
import NavigationPanel from '../components/NavigationPanel';
import DestinationSelector from '../components/DestinationSelector';
import { navigationAPI, buildingsAPI } from '../services/api';
import { requestLocationPermission, getCurrentLocation, watchUserLocation } from '../utils/location';
```

### From NavigationPanel.js
```javascript
import { calculateDistance } from '../utils/location';
```

### From AuthScreen.js
```javascript
import { AuthContext } from '../context/AuthContext';
```

### From DestinationScreen.js
```javascript
import { buildingsAPI, roomsAPI } from '../services/api';
```

### From api.js
```javascript
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
```

### From location.js
```javascript
import * as Location from 'expo-location';
```

---

## Configuration Files

### app.json
- Expo app configuration
- iOS permissions
- Android permissions
- App name and slug
- Plugins configuration

### package.json
- Project metadata
- Dependencies list
- Dev dependencies
- NPM scripts
- Version info

### babel.config.js
- Babel presets
- Transpiler configuration

### .gitignore
- Node modules
- Expo cache
- Environment files
- Build artifacts

---

## Adding New Files

### To Add a New Screen
1. Create file in `src/screens/NewScreen.js`
2. Import in `App.js`
3. Add to navigation stack

### To Add a New Component
1. Create file in `src/components/NewComponent.js`
2. Import where needed
3. Use in screens

### To Add a New Service
1. Create file in `src/services/newService.js`
2. Export functions
3. Import in screens/components

### To Add a New Utility
1. Create file in `src/utils/newUtil.js`
2. Export functions
3. Import where needed

---

## File Naming Conventions

- **Screens**: PascalCase + "Screen" suffix (e.g., `MapScreen.js`)
- **Components**: PascalCase (e.g., `NavigationPanel.js`)
- **Services**: camelCase (e.g., `api.js`)
- **Utils**: camelCase (e.g., `location.js`)
- **Context**: PascalCase + "Context" suffix (e.g., `AuthContext.js`)
- **Documentation**: UPPERCASE_WITH_UNDERSCORES (e.g., `README.md`)

---

## Best Practices

### File Organization
- Keep related files together
- Use meaningful names
- Follow naming conventions
- Maintain consistent structure

### Import Organization
- External imports first
- Internal imports second
- Relative paths for internal
- Absolute paths for external

### File Size
- Keep files under 300 lines
- Split large components
- Extract reusable logic
- Use services for API calls

### Documentation
- Add comments for complex logic
- Document function parameters
- Explain non-obvious code
- Keep docs up-to-date

---

## Scaling the Project

### Adding Features
1. Create new screen in `src/screens/`
2. Create components in `src/components/`
3. Add API calls in `src/services/`
4. Add utilities in `src/utils/`
5. Update navigation in `App.js`

### Refactoring
1. Extract common logic to utils
2. Create reusable components
3. Consolidate API calls
4. Optimize imports

### Performance
1. Lazy load screens
2. Memoize components
3. Optimize re-renders
4. Cache API responses

---

## Maintenance

### Regular Tasks
- Update dependencies
- Review and refactor code
- Update documentation
- Test new features
- Monitor performance

### File Cleanup
- Remove unused files
- Delete dead code
- Consolidate duplicates
- Archive old versions

---

## Summary

The mobile app is organized into:
- **8 source code files** (~1,500 lines)
- **4 configuration files** (~90 lines)
- **7 documentation files** (~2,000 lines)
- **Total: 19 files** (~3,500 lines)

All files are well-organized, documented, and ready for development and deployment.

---

**Last Updated**: March 13, 2026
**Version**: 1.0.0
**Status**: Complete
