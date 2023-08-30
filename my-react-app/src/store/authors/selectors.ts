import { State } from "../../types";

export const selectAuthors = (state: State) => state.authors.authors;
export const selectAuthorsLoading = (state: State) => state.authors.isLoading;
