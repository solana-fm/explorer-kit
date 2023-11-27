export class LogExtractor {
  constructor(public logs: string[]) {}

  next(): string | null {
    if (this.logs.length === 0) {
      return null;
    }
    const log = this.logs[0];
    this.logs = this.logs.slice(1);
    return log;
  }
}
