import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFlora, deleteFlora, editFlora, getAllFlora, getFlora } from "./api";
import type { Flora } from "@serverTypes";
import { useParams } from "react-router-dom";
import { z } from "zod";

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

export const useAddFlora = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFlora,
    onSettled: () => {
      queryClient.invalidateQueries(["getAllFlora"]);
    },
  });
};

export const useEditFlora = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editFlora,
    onSettled: (input) => {
      queryClient.invalidateQueries(["getFlora", input?.id]);
      queryClient.invalidateQueries(["getAllFlora"]);
    },
  });
};

export const useDeleteFlora = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFlora,
    onSettled: (input) => {
      queryClient.invalidateQueries(["getFlora", input?.id]);
      queryClient.invalidateQueries(["getAllFlora"]);
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
