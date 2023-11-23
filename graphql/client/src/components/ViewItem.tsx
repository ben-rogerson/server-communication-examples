import { z } from "zod";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useDeleteFlora, useFlora, useIdParam } from "@/utils/hooks";
import Flora from "./Flora";

function ViewItem() {
  const id = useIdParam();
  const flora = useFlora(id);
  const [deleteFlora, deleteData] = useDeleteFlora();
  const [deleteError, setDeleteError] = useState<string>();

  const handleDelete = async () => {
    try {
      await deleteFlora({ variables: { id } });
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    }
  };

  if (deleteData.data)
    return (
      <>
        <div>Deleted “{deleteData.data.deleteFlora.title}”</div>
        <Link to="/">View all</Link>
      </>
    );

  if (flora.loading) return <>Loading</>;
  if (flora.error)
    return (
      <div className="text-red-500">Error: {getErrorMessage(flora.error)}</div>
    );

  if (!flora.data) return null;

  return (
    <>
      <Flora {...flora.data.getFlora} />
      <div className="flex gap-x-5">
        <Link to={`/edit/${id}`}>Edit</Link>
        <button
          type="button"
          onClick={handleDelete}
          className="p-0 border-0 hover:border-transparent hover:text-[greenyellow] hover:border-transparent disabled:text-gray-500 focus:outline-0"
          disabled={deleteData.loading}
        >
          {deleteData.loading ? "Deleting" : "Delete"}
        </button>
      </div>
      {deleteError && (
        <div className="text-red-500">Delete error: {deleteError}</div>
      )}
    </>
  );
}

export default ViewItem;
