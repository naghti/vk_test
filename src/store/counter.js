import {makeAutoObservable} from "mobx"

class Counter {


  constructor() {
    makeAutoObservable(this)
  }
}

export default new Counter()