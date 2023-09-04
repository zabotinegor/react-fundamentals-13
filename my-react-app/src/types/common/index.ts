export interface Action<T> {
  type: string;
  payload: T;
}

export interface Request {
  handleAPIError?: (code: number) => void;
  handleError?: (error: unknown) => void;
}

export interface Response<T> {
  status: number;
  data?: T;
}
