"use client";

import { OnlineIndicator } from "@/components/OnlineIndicator";
import { UserTable } from "@/components/UserTable";
import { db, User } from "@/dexie/db";
import { useSyncStore } from "@/zustand/sync-store";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const setLoading = useSyncStore((state) => state.setLoading);
  const setOffline = useSyncStore((state) => state.setOffline);

  useEffect(() => {
    async function getUserData() {
      try {
        setLoading(true);

        setOffline(false);

        const response = await axios.get(
          "https://randomuser.me/api/?page=1&results=10",
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userIDs = response.data.results.map((u: any) => u.login.uuid);
        const existingUsers = await db.users.bulkGet(userIDs);
        const foundUsers = existingUsers.filter((u) => u !== undefined);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const users: User[] = response.data.results.map((u: any) => {
          const match = foundUsers.find((f) => f.id === u.login.uuid);

          return {
            ...u,
            id: u.login.uuid,
            favorite: match ? match.favorite : false,
          };
        });

        await db.users.bulkPut(users);
      } catch (error) {
        toast.error(`${error}`);
        setOffline(true);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [setLoading, setOffline]);

  return (
    <div className="space-y-2">
      <OnlineIndicator />
      <UserTable />
    </div>
  );
}
