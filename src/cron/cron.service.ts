import { HttpService, Injectable } from '@nestjs/common';
import { CronJob } from './cron.model';
import { map } from 'rxjs/operators';

const cron = require('node-cron');

@Injectable()
export class CronService {
  jobs: CronJob[] = [];

  constructor(private http: HttpService) {
    const job: CronJob = {
      active: true,
      func: () => {
        this.http.get('https://jsonplaceholder.typicode.com/todos/1')
          .pipe(
            map(response => response.data),
          ).subscribe(data => {
          console.log(data);
        });
      },
      name: 'test',
      interval: '*/1 * * * *',
    };

    // TODO this.addJob(job);
    // TODO this.startJob('test');
  }

  addJob(job: CronJob) {
    const task = cron.schedule(job.interval, job.func, {
      scheduled: false,
    });

    job.task = task;
    this.jobs.push(job);
    console.log('Added new job:', job.name);
  }

  startJob(name: string) {
    this.jobs.filter(job => job.name === name).forEach(job => {
      job.task.start();
      console.log('Job started:', job.name);
    });
  }

  stopJob(name: string) {
    this.jobs.filter(job => job.name === name).forEach(job => {
      job.task.stop();
      console.log('Job stopped:', job.name);
    });
  }

  stopAll() {
    this.jobs.forEach(job => {
      job.task.stop();
      console.log('Job stopped:', job.name);
    });
  }
}
