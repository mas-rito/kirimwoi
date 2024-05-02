export const revalidateData = async () => {
  return await fetch(
    process.env.NEXT_PUBLIC_DOMAIN +
      "/api/revalidate?tag=files&secret=" +
      process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
    {
      method: "POST",
    }
  )
}
