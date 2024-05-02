export const getData = async (url: string) => {
  const response = await fetch(url, {
    next: {
      tags: ["files"],
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  return response.json()
}
