# Deployment

The production build is served by Nginx from `/var/www/html` on the PixelMurmur server.

- Domain: `pixelmurmur.com`, `www.pixelmurmur.com`
- Server: Ubuntu 22.04 / Nginx
- Versioned releases: `/home/kensol/apps/pixel-murmur/releases/<commit>`
- Current release: `/home/kensol/apps/pixel-murmur/current`
- Nginx site: `/etc/nginx/sites-available/pixelmurmur`

The default Nginx document root was backed up before the first deployment.
