import {makeAutoObservable} from "mobx"
import { commentsI, filtersI } from "../interfaces/Comment"

class Counter {
  comments: Array<commentsI> = []
  deleted: Set<number> = new Set(JSON.parse(localStorage.getItem("deletedComments") || "[]"))
  edited: {[key: number]: string} = JSON.parse(localStorage.getItem("editedComments") || "{}")
  commentsForRender = this.comments
  filters: filtersI = {
    filterByText: null,
    filterById: false,
    filterByTitle: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setComments(arr: Array<commentsI>) {
    this.comments = arr
  }

  addDeleted(id: number) {
    this.deleted.add(id)
    localStorage.setItem("deletedComments", JSON.stringify(this.deleted))
  }

  addEdited(info: commentsI) {
    this.edited[info.id] = info.body
    localStorage.setItem("editedComments", JSON.stringify(this.edited))
  }

  setFilters<K extends keyof filtersI>(filter: K, val: filtersI[K]) {
    this.filters[filter] = val
  }

  getUnDeletedAndEditedComments() {
    return this.comments.filter((i) => {
      return !(this.deleted.has(i.id))
    }).map(i => {
      if (i.id in this.edited) {
        return {...i, title: this.edited[i.id]}
      } 
      return i
    })
  }

  getFilteredComments() {
    let comments = [...this.getUnDeletedAndEditedComments()]

    if (this.filters.filterByText) {
      comments = comments.filter(comment => comment.body.includes(this.filters.filterByText!))
    }

    if (this.filters.filterById) {
      comments.sort((a, b) => b.id - a.id)
    }

    if (this.filters.filterByTitle) {
      comments.sort((a, b) => {
        if (a.body > b.body) return 1
        else if (a.body < b.body) return -1
        return 0
      })
    }

    return comments
  }
}

export default new Counter()