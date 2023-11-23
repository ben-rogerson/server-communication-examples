import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFlora,
  deleteFlora,
  editFlora,
  viewAllFlora,
  viewFlora,
} from "./api";
import type { Flora } from "@serverTypes";
import { useParams } from "react-router-dom";
import { z } from "zod";

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

export const useAddFlora = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFlora,
    onSettled: () => {
      queryClient.invalidateQueries(["viewAllFlora"]);
    },
  });
};

export const useEditFlora = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editFlora,
    onSettled: (input) => {
      queryClient.invalidateQueries(["viewFlora", input?.id]);
      queryClient.invalidateQueries(["viewAllFlora"]);
    },
  });
};

export const useDeleteFlora = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFlora,
    onSettled: (input) => {
      queryClient.invalidateQueries(["viewFlora", input?.id]);
      queryClient.invalidateQueries(["viewAllFlora"]);
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
