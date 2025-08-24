"use client";

import { db, User } from "@/dexie/db";
import { useSyncStore } from "@/zustand/sync-store";
import { ColumnDef } from "@tanstack/react-table";
import { useLiveQuery } from "dexie-react-hooks";
import { DataTable } from "./ui/data-table";
import { Star, StarOff } from "lucide-react";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "favorite",
    header: "Favorite",
    cell: ({ row }) =>
      row.original.favorite ? <Star size={16} /> : <StarOff size={16} />,
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
  const offline = useSyncStore((state) => state.offline);

  const users =
    useLiveQuery(() => db.users.orderBy("name.last").limit(10).toArray()) || [];

  return <DataTable columns={columns} data={users} />;
};
