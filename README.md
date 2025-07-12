# Hive Bridge Proxy Server

A Node.js proxy server that helps bypass CORS and DNS issues when making API calls to Hive blockchain services from web applications.

## 🚀 Features

- **CORS Support**: Handles cross-origin requests for web applications
- **Error Handling**: Proper error responses and logging
- **Environment Configuration**: Supports both development and production environments
- **Hive Bridge API**: Proxies calls to `https://rpc.ecency.com/hive-bridge`

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

   The server will run on port 4000 by default, or the port specified by the `PORT` environment variable.

## 🌐 Deployment

### Render Deployment

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set the root directory to `diba-bridge-proxy`
   - Set the build command: `npm install`
   - Set the start command: `npm start`

2. **Environment Variables**
   - No additional environment variables needed
   - Render will automatically set the `PORT` environment variable

3. **Deploy**
   - Render will automatically deploy your proxy server
   - You'll get a URL like: `https://hive-proxy-server.onrender.com`

### Update Frontend Configuration

After deployment, update your frontend's API configuration:

```typescript
// src/config/api.ts
export const PROXY_URL = isDevelopment 
  ? 'http://localhost:4000' 
  : 'https://your-render-url.onrender.com'; // Replace with your actual Render URL
```

## 🔧 Configuration

### Development
- **Port**: 4000 (default)
- **CORS**: Allows `http://localhost:3000` (your frontend)

### Production
- **Port**: Set by `PORT` environment variable (Render)
- **CORS**: Configured for your production domain

## 📡 API Endpoints

### POST `/hive-bridge`
Proxies requests to `https://rpc.ecency.com/hive-bridge`

**Request Body:**
```json
{
  "jsonrpc": "2.0",
  "method": "call",
  "params": ["bridge", "list_communities", [{ "limit": 100 }]],
  "id": 1
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "communities": [...]
  }
}
```

## 🧪 Testing

### Test the Proxy Locally

1. **Start the proxy server**
   ```bash
   npm start
   ```

2. **Test with curl**
   ```bash
   curl -X POST http://localhost:4000/hive-bridge \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "method": "call",
       "params": ["bridge", "list_communities", [{"limit": 5}]],
       "id": 1
     }'
   ```

3. **Test from your frontend**
   - Use the ProxyTest component in your React app
   - Navigate to the test page and click "Test Proxy Connection"

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your frontend domain is allowed in the CORS configuration
   - Check that the proxy URL is correct in your frontend config

2. **Connection Refused**
   - Verify the proxy server is running
   - Check the port configuration

3. **API Errors**
   - Check the proxy server logs for detailed error messages
   - Verify the Hive API endpoints are accessible

### Logs

The server logs all requests and errors to the console. Check the logs for:
- Request details
- Response status codes
- Error messages
- Proxy fetch errors

## 📝 License

ISC License - see package.json for details 