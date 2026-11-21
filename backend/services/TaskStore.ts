import { SeedTask, Task, TaskInput } from '../types/task';

export class TaskStore {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(seed: SeedTask[] = []) {
    seed.forEach(({ createdAt, ...input }) => this.create(input, createdAt));
  }

  findAll(): Task[] {
    return this.tasks.map((task) => ({ ...task }));
  }

  findById(id: number): Task | undefined {
    const task = this.find(id);

    if (!task) {
      return undefined;
    }

    return { ...task };
  }

  create(input: TaskInput, createdAt = new Date()): Task {
    const task: Task = {
      id: this.nextId++,
      title: input.title,
      description: input.description,
      priority: input.priority,
      completed: input.completed ?? false,
      createdAt,
    };

    this.tasks.push(task);

    return { ...task };
  }

  update(id: number, input: TaskInput): Task | undefined {
    const task = this.find(id);

    if (!task) {
      return undefined;
    }

    task.title = input.title;
    task.description = input.description;
    task.priority = input.priority;
    task.completed = input.completed ?? task.completed;

    return { ...task };
  }

  toggle(id: number): Task | undefined {
    const task = this.find(id);

    if (!task) {
      return undefined;
    }

    task.completed = !task.completed;

    return { ...task };
  }

  remove(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);

    return true;
  }

  private find(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }
}
