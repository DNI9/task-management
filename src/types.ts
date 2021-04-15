export enum QueryType {
  FETCH_TASKS = 'FETCH_TASKS',
}

export type TaskStatus = 'OPEN' | 'DONE' | 'IN_PROGRESS';

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};
