import { mockedAuthorsList } from "../mocks/Authors";

export function getAuthorsList(authors: string[]): string {
  const authorMap = new Map(
    mockedAuthorsList.map((author) => [author.id, author.name])
  );

  return authors.map((authorId) => authorMap.get(authorId)).join(", ");
}
