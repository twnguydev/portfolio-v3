import { NextRequest, NextResponse } from 'next/server';
import { GithubProjectFetcher } from '@/utils/github-project-fetcher';
import { githubConfig } from '@/config/github';

let isRunning = false;

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  const skipAuth = request.headers.get('x-admin-request') === process.env.ADMIN_API_KEY;
  
  if (!skipAuth && process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (isRunning) {
    return NextResponse.json({ 
      error: 'Another update is already in progress',
      message: 'Please try again later'
    }, { status: 409 });
  }
  
  isRunning = true;
  
  try {
    const fetcher = new GithubProjectFetcher(githubConfig);
    await fetcher.updatePortfolioProjects();
    
    isRunning = false;
    return NextResponse.json({ 
      success: true, 
      message: 'Projects updated successfully',
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating GitHub projects:', error);
    isRunning = false;
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}