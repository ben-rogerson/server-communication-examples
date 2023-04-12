import type { Flora } from "@serverTypes";
import { socket } from "@/socket";

export const getAllFlora = async () =>
  await new Promise<Flora[]>((resolve, reject) => {
    socket.emit("getAllFlora", (res: Flora[], err: string) =>
      err ? reject(err) : resolve(res)
    );
  });

export const getFlora = async (id: Flora["id"]) =>
  await new Promise<Flora>((resolve, reject) => {
    socket.emit("getFlora", { id }, (res: Flora, err: string) =>
      err ? reject(err) : resolve(res)
    );
  });

export const addFlora = async ({
  title,
  uses,
}: Pick<Flora, "title" | "uses">) =>
  await new Promise<Flora>((resolve, reject) => {
    socket.emit("addFlora", { title, uses }, (res: Flora, err: string) =>
      err ? reject(err) : resolve(res)
    );
  });

export const editFlora = async ({ id, title, uses }: Flora) =>
  await new Promise<Flora>((resolve, reject) => {
    socket.emit("editFlora", { id, title, uses }, (res: Flora, err: string) =>
      err ? reject(err) : resolve(res)
    );
  });

export const deleteFlora = async (id: Flora["id"]) =>
  await new Promise<Flora>((resolve, reject) => {
    socket.emit("deleteFlora", { id }, (res: Flora, err: string) =>
      err ? reject(err) : resolve(res)
    );
  });
