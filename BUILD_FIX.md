# Build Error Fix Guide

## Error: ENOENT: no such file or directory, open '.next/prerender-manifest.json'

This error occurs when the Next.js build output is incomplete or corrupted.

## Solution Steps:

### 1. Clean the build directory
```bash
rm -rf .next
```

Or use the npm script:
```bash
npm run clean
```

### 2. Rebuild the application
```bash
npm run build
```

Or use the rebuild script:
```bash
npm run rebuild
```

### 3. Verify the build completed successfully
Make sure you see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### 4. Start the production server
```bash
npm start
```

Or for port 9000:
```bash
npm run start:prod
```

## Common Causes:

1. **Build was interrupted** - Make sure the build process completes fully
2. **Insufficient disk space** - Check available disk space
3. **Permission issues** - Ensure write permissions for `.next` directory
4. **Node modules issues** - Try `rm -rf node_modules && npm install`

## Production Deployment Checklist:

1. ✅ Clean previous builds: `npm run clean`
2. ✅ Install dependencies: `npm ci` (or `npm install`)
3. ✅ Build the application: `npm run build`
4. ✅ Verify build output exists: `ls -la .next/`
5. ✅ Start production server: `npm start` or `npm run start:prod`

## Docker/Production Environment:

If using Docker, make sure your Dockerfile includes:
```dockerfile
RUN npm run build
```

And the build completes before starting the server.

