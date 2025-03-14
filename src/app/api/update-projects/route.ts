import { NextApiRequest, NextApiResponse } from 'next';
import { GithubProjectFetcher } from '@/utils/github-project-fetcher';
import { githubConfig } from '@/config/github';

let isRunning = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.headers['x-webhook-secret'];
  const skipAuth = req.headers['x-admin-request'] === process.env.ADMIN_API_KEY;
  
  if (!skipAuth && process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Éviter les exécutions simultanées
  if (isRunning) {
    return res.status(409).json({ 
      error: 'Another update is already in progress',
      message: 'Please try again later'
    });
  }
  
  isRunning = true;
  
  try {
    const fetcher = new GithubProjectFetcher(githubConfig);
    await fetcher.updatePortfolioProjects();
    
    isRunning = false;
    return res.status(200).json({ 
      success: true, 
      message: 'Projects updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating GitHub projects:', error);
    isRunning = false;
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}