"use client";

import { db, User } from "@/dexie/db";
import { useSyncStore } from "@/zustand/sync-store";
import axios from "axios";
import { useEffect } from "react";

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

        const users: User[] = response.data.results.map(
          (u: Omit<User, "favorite">) => ({ favorite: false, ...u }),
        );

        await db.users.bulkPut(users);
      } catch (error) {
        console.error(error);
        setOffline(true);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [setLoading, setOffline]);

  return <main></main>;
}
