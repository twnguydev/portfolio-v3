// src/utils/cron-jobs.ts
import nodeCron from 'node-cron';
import { GithubProjectFetcher } from './github-project-fetcher.js';
import { githubConfig } from '../config/github.js';

let isJobRunning = false;

export function setupGithubCronJob() {
  const cronSchedule = process.env.GITHUB_CRON_SCHEDULE || '0 2 * * *';
  
  console.log(`Configuring GitHub project cron job with schedule: ${cronSchedule}`);
  
  if (!nodeCron.validate(cronSchedule)) {
    console.error(`Invalid cron expression: ${cronSchedule}`);
    return;
  }
  
  nodeCron.schedule(cronSchedule, async () => {
    if (isJobRunning) {
      console.log('GitHub project fetch job already running, skipping...');
      return;
    }
    
    isJobRunning = true;
    console.log(`[${new Date().toISOString()}] Running GitHub project fetch job`);
    
    try {
      const fetcher = new GithubProjectFetcher(githubConfig);
      await fetcher.updatePortfolioProjects();
      console.log(`[${new Date().toISOString()}] GitHub project fetch job completed successfully`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error in GitHub project fetch job:`, error);
    } finally {
      isJobRunning = false;
    }
  });
  
  if (process.env.RUN_GITHUB_JOB_ON_STARTUP === 'true') {
    console.log('Running GitHub project fetch job on startup');
    setTimeout(async () => {
      try {
        isJobRunning = true;
        const fetcher = new GithubProjectFetcher(githubConfig);
        await fetcher.updatePortfolioProjects();
        console.log('Initial GitHub project fetch job completed successfully');
      } catch (error) {
        console.error('Error in initial GitHub project fetch job:', error);
      } finally {
        isJobRunning = false;
      }
    }, 5000);
  }
}