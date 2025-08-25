"use client";

import { db, User } from "@/dexie/db";
import { useSyncStore } from "@/zustand/sync-store";
import { ColumnDef } from "@tanstack/react-table";
import { useLiveQuery } from "dexie-react-hooks";
import { DataTable } from "./ui/data-table";
import { Star, StarOff } from "lucide-react";
import { toast } from "sonner";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "favorite",
    header: "Favorite",
    cell: ({ row }) => (
      <button
        onClick={async () => {
          try {
            await db.users.update(row.original.id, {
              favorite: !row.original.favorite,
            });

            toast.success(
              row.original.favorite
                ? "User unmarked as favorite. 😢"
                : "User marked as favorite! 🥳",
            );
          } catch (error) {
            console.log(error);
            toast.error("Could not toggle favorite, please try again.");
          }
        }}
        className="cursor-pointer"
      >
        {row.original.favorite ? (
          <Star size={20} className="fill-yellow-500 text-yellow-500" />
        ) : (
          <StarOff
            size={20}
            className="transition-colors hover:text-yellow-500"
          />
        )}
      </button>
    ),
  },
  {
    accessorKey: "picture.thumbnail",
    header: "Picture",
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={row.original.picture.thumbnail}
        alt="avatar"
        className="size-10 rounded-full object-cover object-center"
      />
    ),
  },
  {
    accessorKey: "name.first",
    header: "First Name",
  },
  {
    accessorKey: "name.last",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        href={"mailto:" + row.original.email}
        className="underline underline-offset-4"
      >
        {row.original.email}
      </a>
    ),
  },
];

export const UserTable = () => {
  const loading = useSyncStore((state) => state.loading);

  const users =
    useLiveQuery(() => db.users.orderBy("name.last").toArray()) || [];

  return <DataTable columns={columns} data={users} loading={loading} />;
};
