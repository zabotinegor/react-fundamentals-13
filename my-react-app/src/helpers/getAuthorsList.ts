interface Author {
  id: string;
  name: string;
}

export function getAuthorsList(
  authors: string[],
  authorList: Author[]
): string {
  const authorMap = new Map(
    authorList.map((author) => [author.id, author.name])
  );

  return authors.map((authorId) => authorMap.get(authorId)).join(", ");
}
