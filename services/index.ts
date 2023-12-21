export const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return data;
};
