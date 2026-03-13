# Mapbox Setup Guide

## Get Your Mapbox Access Token

1. Go to https://www.mapbox.com/
2. Sign up for a free account or log in
3. Go to your Account page
4. Click on "Tokens" in the navigation
5. Copy your default public token (starts with `pk.`)

## Configure the Token

Add your Mapbox token to `backend/.env`:

```
MAPBOX_ACCESS_TOKEN=pk.your_actual_token_here
```

## Install Dependencies

Run in the frontend folder:
```bash
cd frontend
npm install
```

This will install `mapbox-gl` package.

## Features

- Street Map, Satellite, Terrain, and Dark Mode styles
- Custom emoji markers for buildings, rooms, and landmarks
- Smooth animations and transitions
- Route visualization
- Interactive popups with building information

## Note

The map will fetch the token from the backend API endpoint `/api/mapbox-token` automatically.
