
export class QueuedResolver {
  constructor(){
    this.currentPromise = Promise.resolve();
  }
  get promise(){
    return this.currentPromise.catch((e)=>{
      console.error("ignoring previous errors:", e);
    });
  }
  async wrap(fn){
    await this.promise;
    this.currentPromise = fn();
    return this.currentPromise;
  }
}
