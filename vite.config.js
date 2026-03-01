import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Custom plugin to handle saving testimonials to json
const saveTestimonialPlugin = () => ({
  name: 'save-testimonial',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/testimonials' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const newTestimonial = JSON.parse(body);
            // Need to join dirname with src/data/websiteData.json correctly
            const dataPath = path.resolve(process.cwd(), 'src/data/websiteData.json');
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

            data.testimonials.items.push(newTestimonial);

            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Testimonial added' }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), saveTestimonialPlugin()],
})
