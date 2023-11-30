export const ellipsizeStr = (str: string, left: number, right?: number) => {
  if (!str) {
    return "--";
  }
  if (!right) {
    return `${str.slice(0, left)}...`;
  }

  if (left + right > str.length) {
    return str;
  }

  if (str.length < right) {
    return str;
  }
  return `${str.slice(0, left)}...${str.slice(-right)}`;
};
