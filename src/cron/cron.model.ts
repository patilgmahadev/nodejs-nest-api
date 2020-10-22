export interface CronJob {
  name: string;
  interval: any;
  func: any;
  active: boolean;
  task?: any;
}