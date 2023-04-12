import { useMutation, useQuery } from "@tanstack/react-query";
import { addFlora, deleteFlora, editFlora, getAllFlora, getFlora } from "./api";
import type { Flora } from "@serverTypes";

export const useAllFlora = () =>
  useQuery({
    queryKey: ["getAllFlora"],
    queryFn: () => getAllFlora(),
    retry: false,
  });

export const useFlora = (id: Flora["id"]) =>
  useQuery({
    queryKey: ["getFlora", id],
    queryFn: () => getFlora(id),
    retry: false,
  });

export const useAddFlora = () => useMutation({ mutationFn: addFlora });

export const useEditFlora = () => useMutation({ mutationFn: editFlora });

export const useDeleteFlora = () => useMutation({ mutationFn: deleteFlora });
