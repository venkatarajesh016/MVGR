# Campus Pathfinding Algorithm

## Overview
The campus navigation system uses a road-based pathfinding algorithm that NEVER routes over buildings or obstacles. All routes strictly follow the defined road network.

## How It Works

### 1. Road Network Graph
- The campus is mapped as a graph with 32+ road junction nodes
- Each node represents an intersection or key point on a walkable path
- Edges connect nodes that have direct walkable paths between them
- Buildings are NOT part of the graph - only roads are

### 2. Dijkstra's Algorithm
- Uses Dijkstra's shortest path algorithm to find optimal routes
- Calculates actual walking distance between connected nodes
- Always finds the shortest path through the road network
- Guarantees no routes go over buildings

### 3. Building-to-Road Mapping
- Every building is mapped to its nearest road node
- When routing to a building, the algorithm:
  1. Finds the nearest road node to the building entrance
  2. Routes through the road network to that node
  3. Adds a short final segment from road to building entrance

### 4. Obstacle Avoidance
- Buildings are obstacles - they are NOT in the road graph
- If a direct path would cross a building, the algorithm automatically:
  - Finds an alternative route around the obstacle
  - Uses the next shortest path through available roads
  - Never creates a direct line over buildings

### 5. Route Construction
```
Start Location → Nearest Road Node → Road Network Path → Nearest Road Node → End Location
```

Example route:
```
User Location (18.0599, 83.4051)
    ↓ (short walk to road)
Central Plaza (road node)
    ↓ (follow main road north)
North Junction (road node)
    ↓ (follow CS block road)
CS Block Road (road node)
    ↓ (short walk from road)
Computer Science Block (18.0605, 83.4055)
```

## Key Features

### Always Uses Roads
- Routes ONLY use predefined road segments
- No diagonal shortcuts through buildings
- No direct lines across campus

### Automatic Rerouting
- If a path is blocked, finds next best route
- Uses alternative roads automatically
- Dijkstra's algorithm ensures optimal alternative

### Distance Calculation
- Calculates actual walking distance
- Includes all road segments
- Adds entrance-to-road distances

## Road Network Structure

### Node Types
1. **Central Nodes**: Main plaza, crossroads
2. **Building Access Nodes**: Roads adjacent to building entrances
3. **Junction Nodes**: Intersections connecting multiple paths
4. **Gate Nodes**: Campus entrance/exit points

### Edge Properties
- Bidirectional (can walk both ways)
- Weighted by actual distance
- Only connect nodes with clear walkable paths

## Error Handling

### No Route Found
If no path exists through the road network:
- Returns error message
- Does NOT create direct line over buildings
- Suggests selecting different destination

### Disconnected Areas
- All buildings must be connected to road network
- If a building is isolated, routing will fail gracefully
- Never creates impossible routes

## Example Scenarios

### Scenario 1: Simple Route
```
Main Academic Block → Library Building
Route: central_plaza → main_road_west → west_junction → library_road
Distance: ~80m
```

### Scenario 2: Route Around Obstacle
```
Hostel A → Hostel B (buildings block direct path)
Route: hostel_a_road → north_junction → main_road_north → 
       central_plaza → main_road_south → hostel_b_road
Distance: ~180m (avoids cutting through buildings)
```

### Scenario 3: Multiple Alternatives
```
If main route is blocked, algorithm automatically finds:
- Alternative 1: Via east road network
- Alternative 2: Via west road network
- Alternative 3: Via north/south detour
```

## Benefits

1. **Realistic Navigation**: Routes match actual walking paths
2. **Safety**: No routes through restricted areas
3. **Accuracy**: Distance calculations reflect real walking distance
4. **Reliability**: Always finds valid route if one exists
5. **Efficiency**: Dijkstra's algorithm ensures shortest valid path

## Technical Implementation

### Graph Structure
```javascript
{
  nodes: {
    'node_id': { lat: number, lng: number }
  },
  edges: [
    ['node1', 'node2'],  // bidirectional connection
    ['node2', 'node3']
  ]
}
```

### Pathfinding Function
```javascript
generateWalkablePath(startLat, startLng, endLat, endLng, startBuilding, endBuilding)
```

Returns:
- GeoJSON LineString with route coordinates
- Total distance in meters
- Turn-by-turn directions
- List of waypoints (road nodes)

## Maintenance

### Adding New Buildings
1. Add building coordinates to seed data
2. Map building to nearest road node in `buildingToNode`
3. Ensure road node exists in network

### Adding New Roads
1. Add road junction nodes to `campusWalkways.nodes`
2. Add connections to `campusWalkways.edges`
3. Update building mappings if needed

### Expanding Coverage
- Add more road nodes for finer granularity
- Connect new areas to existing network
- Ensure all buildings have road access
