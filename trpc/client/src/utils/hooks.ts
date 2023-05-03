import { trpc } from "@/utils/trpc";
import { Flora } from "@serverTypes";

export const useAllFlora = () =>
  trpc.getAllFlora.useQuery(undefined, { retry: false });

export const useFlora = (id: Flora["id"]) =>
  trpc.getFlora.useQuery(id, { retry: false });

export const useAddFlora = () => trpc.addFlora.useMutation();

export const useEditFlora = () => trpc.editFlora.useMutation();

export const useDeleteFlora = () => {
  const utils = trpc.useContext();
  return trpc.deleteFlora.useMutation({
    onSettled() {
      utils.getAllFlora.refetch();
    },
  });
};
