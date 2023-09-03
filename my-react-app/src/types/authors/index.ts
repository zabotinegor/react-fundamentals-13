import { Request } from "../common";

export interface Author {
  id: string;
  name: string;
}

export interface AuthorsState {
  authors: Author[];
  isLoading: boolean;
}

export interface GetAuthorsResponse {
  result: Author[] | null;
}

export interface CreateAuthorRequest extends Request {
  name: string;
  handleSuccess: (author: Author | null) => void;
}

export interface CreateAuthorResponse {
  result: Author;
}
