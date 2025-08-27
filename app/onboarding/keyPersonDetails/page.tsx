"use client";
import ContactFrom from "@/components/ContactForm";
import { addKeyPersonDetails } from "./action";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const idStr = localStorage.getItem("userId");
      if (idStr) setUserId(Number(idStr));
      else setError("No user found");
    } catch {
      setError("Failed to load user");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !userId) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-red-600">
          {error || "Invalid user"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <ContactFrom
        submitAction={async (items) => {
          const resp = await addKeyPersonDetails(userId, items);
          if (resp?.success) {
            localStorage.setItem(
              "keyPersonData",
              JSON.stringify({ userId, personDetails: items })
            );
          }
          return resp;
        }}
      />
    </div>
  );
};

export default Page;
