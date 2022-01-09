

class DBWrapper {

  async setup(){
    throw new Error("setup needs to be implemented")
  }

  async addItem(newItem){
    throw new Error("addItem needs to be implemented");
  }

  async updateItem(oldValue, newValue){
    throw new Error("updateItem needs to be implemented");
  }

  async removeItem(item){
    throw new Error("removeItem needs to be implemented");
  }

  async getItem(key, value){
    throw new Error("getItem needs to be implemented");
  }

  async hasItem(key, value){
    throw new Error("hasItem needs to be implemented");
  }


}


export { DBWrapper }
