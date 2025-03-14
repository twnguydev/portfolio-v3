const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  if (!dev) {
    try {
      const { setupGithubCronJob } = require('./dist/utils/cron-jobs');
      setupGithubCronJob();
      console.log('GitHub cron job configured successfully');
    } catch (error) {
      console.error('Failed to setup cron jobs:', error);
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