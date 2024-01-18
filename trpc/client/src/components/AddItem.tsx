import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAddFlora } from "@/utils/hooks";

function AddItem() {
  const navigate = useNavigate();
  const addFlora = useAddFlora();
  const [addError, setAddError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const variables = {
      title: String(formData.get("title")).trim(),
      uses: String(formData.get("uses")).trim(),
    };

    try {
      await addFlora.mutateAsync(variables);
      navigate("/");
    } catch (error) {
      setAddError(getErrorMessage(error));
    }
  };

  if (addFlora.isLoading) return <>Adding flora...</>;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
        <label className="grid">
          <div>Flora name</div>
          <input
            name="title"
            type="text"
            autoFocus
            className="w-full px-2 py-1"
          />
        </label>
        <label className="grid gap-y-1">
          <div>Culinary uses</div>
          <textarea rows={10} name="uses" className="w-full px-2 py-1" />
        </label>
        <button
          type="submit"
          className="self-start px-5 text-black bg-[greenyellow]"
        >
          Add
        </button>
      </form>

      {addError && <div className="text-red-500">Error: {addError}</div>}
    </>
  );
}

export default AddItem;
