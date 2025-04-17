# Slimo Group Inc. Official Website

This is the official website repository for Slimo Group Inc., built with HTML, CSS, and JavaScript.

## Project Structure

- `index.html` - Main page
- `css/` - Style files
- `js/` - JavaScript scripts

## Deployment

This project uses GitHub Actions for automatic deployment to Cloudflare Pages.

### Deployment Setup

1. Configure the following secrets in your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID

2. GitHub Actions will automatically trigger the deployment process whenever code is pushed to the `main` branch.

### Manual Deployment

If you need to deploy manually, follow these steps:

1. Install Wrangler CLI:
   ```
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```
   wrangler login
   ```

3. Deploy the site:
   ```
   wrangler pages deploy .
   ```

## Development

1. Clone the repository
2. Make changes
3. Commit changes and push to GitHub
4. Automatic deployment will be triggered 