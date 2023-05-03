import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useDeleteFlora, useFlora } from "@/utils/hooks";
import Flora from "./Flora";
import { z } from "zod";

function ViewItem() {
  const { id } = useParams();
  if (!id || !z.string().uuid().safeParse(id).success)
    throw new Error("No ID provided");

  const flora = useFlora(id);
  const deleteFlora = useDeleteFlora();
  const [deleteError, setDeleteError] = useState<String | null>(null);

  const handleDelete = async () => {
    try {
      await deleteFlora.mutateAsync(id);
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    }
  };

  if (flora.isLoading) return <>Loading</>;
  if (flora.isError)
    return (
      <div className="text-red-500">Error: {getErrorMessage(flora.error)}</div>
    );

  if (deleteFlora.isSuccess)
    return (
      <>
        <div>Deleted “{deleteFlora.data.title}”</div>
        <Link to="/">View all</Link>
      </>
    );

  return (
    <>
      <Flora {...flora.data} />
      <div className="flex gap-x-5">
        <Link to={`/edit/${id}`}>Edit</Link>
        <button
          type="button"
          onClick={handleDelete}
          className="p-0 border-0 hover:border-transparent hover:text-[greenyellow] hover:border-transparent disabled:text-gray-500 focus:outline-0"
          disabled={deleteFlora.isLoading}
        >
          {deleteFlora.isLoading ? "Deleting" : "Delete"}
        </button>
      </div>
      {deleteError && (
        <div className="text-red-500">Delete error: {deleteError}</div>
      )}
    </>
  );
}

export default ViewItem;
