export function stringToEnum<T extends string, E extends Record<string, T>>(
  enumObj: E,
  str: string
): E[keyof E] | undefined {
  return enumObj[str as keyof E];
}
