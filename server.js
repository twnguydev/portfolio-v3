// server.js
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  if (!dev) {
    try {
      import('./dist/utils/cron-jobs.js').then(({ setupGithubCronJob }) => {
        setupGithubCronJob();
        console.log('GitHub cron job configured successfully');
      }).catch(error => {
        console.error('Failed to setup cron jobs:', error);
        console.log('Starting server without GitHub cron job');
      });
    } catch (error) {
      console.error('Failed to import cron jobs module:', error);
      console.log('Starting server without GitHub cron job');
    }
  }

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});