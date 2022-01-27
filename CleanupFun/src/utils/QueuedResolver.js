
export class QueuedResolver {
  constructor(){
    this.currentPromise = Promise.resolve();
  }
  async wrap(fn){
    await this.currentPromise;
    this.currentPromise = fn();
    return await this.currentPromise;
  }
}
