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

export interface CreateAuthorRequest {
  token: string;
  name: string;
  handleSuccess: (author: Author | null) => void;
  handleAPIError: (code: number) => void | null;
  handleError: (error: unknown) => void | null;
}

export interface CreateAuthorResponse {
  result: Author;
}
