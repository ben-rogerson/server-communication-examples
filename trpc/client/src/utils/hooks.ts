import { trpc } from "@/utils/trpc";
import { Flora } from "@serverTypes";
import { useParams } from "react-router-dom";
import { z } from "zod";

export const useAllFlora = () =>
  trpc.getAllFlora.useQuery(undefined, { retry: false });

export const useFlora = (id: Flora["id"]) =>
  trpc.getFlora.useQuery(id, { retry: false });

export const useAddFlora = () => {
  const utils = trpc.useContext();
  return trpc.addFlora.useMutation({
    onSettled: () => {
      utils.getAllFlora.invalidate();
    },
  });
};

export const useEditFlora = () => {
  const utils = trpc.useContext();
  return trpc.editFlora.useMutation({
    onSettled: (input) => {
      utils.getFlora.invalidate(input?.id);
      utils.getAllFlora.invalidate();
    },
  });
};

export const useDeleteFlora = () => {
  const utils = trpc.useContext();
  return trpc.deleteFlora.useMutation({
    onSettled(input) {
      utils.getFlora.invalidate(input?.id);
      utils.getAllFlora.invalidate();
    },
  });
};

export const useIdParam = () => {
  const { id } = useParams();
  if (!id) throw new Error("No ID provided");
  if (z.string().uuid().safeParse(id).success === false)
    throw new Error("Incorrect ID provided");
  return id;
};
