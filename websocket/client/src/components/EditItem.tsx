import { z } from "zod";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEditFlora, useFlora } from "@/utils/hooks";

function EditItem() {
  const { id } = useParams();
  if (!id || !z.string().uuid().safeParse(id).success)
    throw new Error("No ID provided");

  const navigate = useNavigate();
  const flora = useFlora(id);
  const editFlora = useEditFlora();
  const [editError, setEditError] = useState<String | null>(null);

  const handleChange = () => {
    setEditError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const variables = {
      id,
      title: String(formData.get("title")).trim(),
      uses: String(formData.get("uses")).trim(),
    };

    try {
      await editFlora.mutateAsync(variables);
      navigate(`/${id}`);
    } catch (error) {
      setEditError(getErrorMessage(error));
    }
  };

  if (flora.isLoading) return <>Loading</>;
  if (flora.error)
    return (
      <div className="text-red-500">Error: {getErrorMessage(flora.error)}</div>
    );

  if (!flora.data) return null;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
        <label className="block grid gap-y-1">
          <div>Flora name</div>
          <input
            name="title"
            type="text"
            defaultValue={flora.data.title}
            autoFocus
            className="w-full px-2 py-1"
            onChange={handleChange}
          />
        </label>
        <label className="block grid gap-y-1">
          <div>Culinary uses</div>
          <textarea
            name="uses"
            rows={10}
            defaultValue={flora.data.uses}
            className="w-full px-2 py-1"
            onChange={handleChange}
          ></textarea>
        </label>
        <button
          type="submit"
          className="self-start px-5 text-black bg-[greenyellow] hover:border-[greenyellow]"
        >
          Update
        </button>
      </form>

      {editError && <div className="text-red-500">Error: {editError}</div>}
    </>
  );
}

export default EditItem;
