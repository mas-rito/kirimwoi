import FileInfo from "@/app/_components/FileInfo";
import { getData } from "@/services/files";

const SingleFile = async ({ params }: { params: { id: string } }) => {
  const file = await getData(
    `${process.env.NEXT_LOCAL_DOMAIN}/api/files?id=${params.id}`
  );
  const fileShortUrl = process.env.NEXT_PUBLIC_DOMAIN + "/f/" + file.data.id;

  return (
    <div className="flex justify-center px-14">
      <FileInfo data={file.data} fileUrl={fileShortUrl} />
    </div>
  );
};

export default SingleFile;
