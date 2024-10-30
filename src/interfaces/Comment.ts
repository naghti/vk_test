export interface commentsI {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface filtersI {
  filterByText: string | null;
  filterById: boolean;
  filterByTitle: boolean;
}