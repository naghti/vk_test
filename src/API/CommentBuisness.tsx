import axios from "axios";
import CommentService from "./CommentService";
import { commentsI } from "../interfaces/Comment";
import counter from "../store/counter";

export default new class CommentBuisness {
  page: number;
  constructor () {
    this.page = 2
  }

  async getNew(limit: number = 100): Promise<commentsI[]> {
    const response = await CommentService.getAll(limit, this.page)

    this.page++
    counter.setComments(
      [...counter.comments, ...response.data]
    )
    return response.data;
  }
}

