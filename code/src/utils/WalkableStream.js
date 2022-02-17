import { Transform } from "readable-stream";

const NEEDS_TO_BE_IMP = "needs to be implemented";

const SYM_RUN_STEP = Symbol("run step");

// We have an issue regarding order and asynchronous parts
// might be a good idea to use a queue resolver

export class WalkableStream extends Transform {

  constructor(options){
    super({ objectMode: true });
    const { maxItemsPerStep, dontEnd } = (options || {});
    this.maxItemsPerStep = maxItemsPerStep || 16;
    this.dontEnd = !!dontEnd;
    this.offset = 0;
    this.lastStep = 0;
    this.cachedItems = [];
    this.parentFinished = false;
    this.numberOfStepsWaiting = 0;
    this.pullFn = void 0;
    this.on("data", (items)=>{
      this.numberOfStepsWaiting = Math.max(this.numberOfStepsWaiting - 1, 0);
      this.offset = this.offset + items.length;
      this.lastStep = items.length;
      if(this.pullFn){
        const pullFn = this.pullFn;
        this.pullFn = void 0;
        pullFn();
      }
    });
  }

  hasMoreItems(){
    return this.cachedItems.length > this.offset;
  }

  step(){
    const oldStepsWaiting = this.numberOfStepsWaiting;
    this.numberOfStepsWaiting++;
    if(oldStepsWaiting){
      return false;
    }
    if(this.parentFinished){
      if(this.offset === this.cachedItems.length){
        if(!this.dontEnd) this.push(null);
        return true;
      }
      this[SYM_RUN_STEP]();
      return true;
    }
    if(this.offset + this.maxItemsPerStep > this.cachedItems.length){
      if(this.pullFn){
        const pullFn = this.pullFn;
        this.pullFn = void 0;
        pullFn();
      }
      return false;
    }
    this[SYM_RUN_STEP]();
    return true;
  }
  [SYM_RUN_STEP](toStep){
    this.push(
      this.cachedItems.slice(this.offset, this.maxItemsPerStep)
    );
  }

  stepBack(){
    this.numberOfStepsWaiting = 0;
    if(this.cachedItems.length === 0) return false;

    // If we are at the beginning we can't walk back
    // if the last step would put us at the beginning, we can't walk back
    // because we'd be returning the same items
    // If we can't retrieve the items before the last step
    //
    if(this.offset - (this.lastStep) === 0) return false;
    this.offset = this.offset - (this.lastStep) - this.maxItemsPerStep;
    this[SYM_RUN_STEP]();
    return true;
  }

  _transform(item, encoding, callback){
    this.cachedItems.push(item);
    if(!this.numberOfStepsWaiting){
      this.pullFn = callback;
      return;
    }
    if(this.cachedItems.length - this.offset === this.maxItemsPerStep){
      this[SYM_RUN_STEP](this.maxItemsPerStep);
    }
    callback();
  }
  _flush(cb){
    // Get rid of the pull function since we can't pull anymore
    this.pullFn = void 0;
    this.parentFinished = true;
    if(this.numberOfStepsWaiting){
      if(this.offset < this.cachedItems.length){
        this[SYM_RUN_STEP]();
      } else {
        cb();
      }
    }
  }

  updateIndex(index, updatedItem){
    this.cachedItems[index] = updatedItem;

    // If the index is too low, doesn't matter
    if(index < this.offset) return false;

    // If we are currently waiting then we probably can't update the item
    if(this.numberOfStepsWaiting) return false;
    if(this.parentFinished){
      this.push(
        this.cachedItems.slice(this.offset),
      );
      return true;
    }
    if(this.offset + this.maxItemsPerStep >= index){
      return false;
    }
    this.push(
      this.cachedItems.slice(this.offset, this.maxItemsPerStep),
    );
    return true;
  }

  updateAllItemsMatching(test, update){
    if(this.numberOfStepsWaiting){
      this.cachedItems = this.cachedItems.map((item)=>{
        return test(item) ? update(item) : item;
      });
      return false;
    }

    // Doesn't matter if we have ended or not
    // if we ended, then the maxOffset will always be larger than the last index
    const startPos = this.offset - this.lastStep;
    const maxOffset = this.offset - (1);
    var updateFlag = false;
    const setUpdateFlag = (index)=>{
      if(updateFlag) return;
      if(index < startPos) return;
      if(index > maxOffset) return;
      updateFlag = true;
    };
    this.cachedItems = this.cachedItems.map((item, index)=>{
      if(!test(item)) return item;
      setUpdateFlag(index);
      const nextItem = update(item);
      return nextItem;
    });
    if(!updateFlag) return false;

    // I just need to worry about not reaching the end if we arent there yet
    this.offset = this.offset - this.lastStep;
    this.push(
      this.cachedItems.slice(startPos, this.lastStep),
    );
    return true;
  }
}
