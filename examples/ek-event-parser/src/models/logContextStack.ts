export class LogContextStack {
  stack: string[] = [];

  getProgram(): string {
    return this.stack[this.stack.length - 1] ?? "Unknown Program";
  }

  push(programHash: string) {
    this.stack.push(programHash);
  }

  pop() {
    this.stack.pop();
  }
}
