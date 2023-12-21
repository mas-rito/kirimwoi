export const getData = async (url: string) => {
  const response = await fetch(url);

  console.log(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};
