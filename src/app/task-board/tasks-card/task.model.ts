export class Task {
  constructor(private title: string, private description: string) {}

  setTitle(title: string) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }
}
