import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFlora,
  deleteFlora,
  editFlora,
  viewAllFlora,
  viewFlora,
} from "./api";
import type { Flora } from "@serverTypes";

export const useAllFlora = () =>
  useQuery({
    queryKey: ["viewAllFlora"],
    queryFn: viewAllFlora,
    retry: false,
  });

export const useFlora = (id: Flora["id"]) =>
  useQuery({
    queryKey: ["viewFlora", id],
    queryFn: () => viewFlora(id),
    retry: false,
  });

export const useAddFlora = () => useMutation({ mutationFn: addFlora });

export const useEditFlora = () => useMutation({ mutationFn: editFlora });

export const useDeleteFlora = () => useMutation({ mutationFn: deleteFlora });
