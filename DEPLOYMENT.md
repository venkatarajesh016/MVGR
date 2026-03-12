# Deployment Guide

## Prerequisites

- MongoDB Atlas account (free tier available)
- Mapbox account (free tier available)
- Heroku account (for backend) or any Node.js hosting
- Vercel account (for frontend) or any static hosting

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox)
3. Create a database user:
   - Database Access → Add New Database User
   - Choose password authentication
   - Save username and password
4. Whitelist IP addresses:
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
5. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://user:password@cluster.mongodb.net/campus-nav?retryWrites=true&w=majority`

## Step 2: Mapbox Setup

1. Go to [Mapbox](https://www.mapbox.com/)
2. Sign up for a free account
3. Navigate to Account → Access Tokens
4. Copy your default public token (starts with `pk.`)
5. Keep this token for backend configuration

## Step 3: Backend Deployment (Heroku)

### Install Heroku CLI

```bash
# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Deploy Backend

```bash
cd backend

# Login to Heroku
heroku login

# Create new app
heroku create campus-nav-backend

# Set environment variables
heroku config:set PORT=5000
heroku config:set MONGO_URI="your_mongodb_atlas_connection_string"
heroku config:set MAPBOX_TOKEN="your_mapbox_token"

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Alternative: Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

## Step 4: Frontend Deployment (Vercel)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Update API URL

Before deploying, update the API base URL in `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.herokuapp.com/api';
```

### Deploy Frontend

```bash
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? campus-navigation
# - Directory? ./
# - Override settings? No
```

### Alternative: Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## Step 5: Configure CORS

Update `backend/server.js` to allow your frontend domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Redeploy backend after this change.

## Step 6: Test Deployment

1. Visit your frontend URL
2. Check if the map loads correctly
3. Test search functionality
4. Test navigation features
5. Try uploading an image
6. Test CSV import

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/campus-nav
MAPBOX_TOKEN=pk.your_mapbox_token_here
```

### Frontend (if needed)
```env
VITE_API_URL=https://your-backend-url.herokuapp.com
```

## Troubleshooting

### Backend Issues

**App crashes on Heroku:**
```bash
# Check logs
heroku logs --tail

# Restart app
heroku restart
```

**Database connection fails:**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has read/write permissions

**File uploads not working:**
- Heroku has ephemeral filesystem
- Consider using AWS S3 or Cloudinary for production
- Or use a persistent storage add-on

### Frontend Issues

**API calls failing:**
- Check CORS configuration in backend
- Verify API URL is correct
- Check browser console for errors

**Map not loading:**
- Verify Mapbox token is valid
- Check browser console for errors
- Ensure token is public (starts with `pk.`)

**Build fails:**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify all dependencies are in package.json

## Production Considerations

### Security
- Use environment-specific CORS origins
- Implement rate limiting
- Add authentication for admin endpoints
- Validate and sanitize all inputs
- Use HTTPS only

### Performance
- Enable gzip compression
- Implement caching strategies
- Optimize images before upload
- Use CDN for static assets
- Add database indexes

### Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track database performance
- Set up uptime monitoring

### Backup
- Enable MongoDB Atlas automated backups
- Export data regularly
- Version control all code
- Document deployment process

## Scaling

### Database
- Upgrade MongoDB Atlas tier as needed
- Add indexes for frequently queried fields
- Implement connection pooling

### Backend
- Use Heroku auto-scaling
- Implement caching (Redis)
- Use load balancer for multiple instances

### Frontend
- Use CDN (Cloudflare)
- Implement lazy loading
- Optimize bundle size
- Use service workers for offline support

## Cost Estimates (Monthly)

- MongoDB Atlas (M0): Free
- Mapbox: Free up to 50,000 requests
- Heroku (Hobby): $7/month
- Vercel: Free for personal projects
- **Total**: ~$7/month for small scale

For production with higher traffic, costs will increase based on usage.
