import { useMutation, useQuery } from "@apollo/client";
import { ADD_FLORA, DELETE_FLORA, EDIT_FLORA } from "@/resolvers/mutations";
import { GET_ALL_FLORA, GET_FLORA } from "@/resolvers/queries";
import { Flora } from "@serverTypes";

export const useAllFlora = () =>
  useQuery<{ getAllFlora: Flora[] }>(GET_ALL_FLORA);

export const useFlora = (id: Flora["id"]) =>
  useQuery<{ getFlora: Flora }>(GET_FLORA, {
    variables: { id },
  });

export const useAddFlora = () =>
  useMutation<{ addFlora: Flora["id"] }>(ADD_FLORA, {
    refetchQueries: [GET_ALL_FLORA],
    awaitRefetchQueries: true,
  });

export const useEditFlora = () => useMutation<{ editFlora: Flora }>(EDIT_FLORA);

export const useDeleteFlora = () =>
  useMutation<{ deleteFlora: Flora }>(DELETE_FLORA, {
    refetchQueries: [GET_ALL_FLORA],
    awaitRefetchQueries: true,
  });
