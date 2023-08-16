export function formatDate(dateString: string): string {
  const parts = dateString.split("/");
  if (parts.length !== 3) {
    return dateString;
  }

  const [month, day, year] = parts;
  return `${day}.${month}.${year}`;
}
