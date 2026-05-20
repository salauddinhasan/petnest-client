"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; // ⚠️ Better Auth ক্লায়েন্ট পাথ ঠিক আছে কি না দেখে নিও

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const session = await authClient.getSession();
        const token = session?.data?.token || "valid_token";

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/my-requests`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success) {
          setRequests(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-neutral-950"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">
          My Adoption Requests
        </h1>
        <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
      </div>

      {/* Table Section */}
      {requests.length === 0 ? (
        <div className="bg-white border border-neutral-200/60 p-8 rounded-2xl text-center text-neutral-400 font-medium text-sm shadow-sm">
          You haven t submitted any adoption requests yet. 🐾
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-neutral-200/60">
          <table className="table w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-neutral-50 text-neutral-950 font-black text-xs uppercase tracking-wider border-b border-neutral-200/60">
              <tr>
                <th className="p-4 font-black">Pet ID</th>
                <th className="p-4 font-black">Phone Number</th>
                <th className="p-4 font-black">Address</th>
                <th className="p-4 font-black">Applied Date</th>
                <th className="p-4 font-black">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-sm text-neutral-700">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-neutral-200/40 hover:bg-neutral-50/50 transition-all"
                >
                  <td className="p-4 font-mono text-xs text-neutral-400">
                    {req.petId}
                  </td>
                  <td className="p-4 font-bold text-neutral-950">
                    {req.requesterPhone}
                  </td>
                  <td className="p-4 font-medium">{req.requesterAddress}</td>
                  <td className="p-4 text-neutral-500">
                    {new Date(req.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-[10px] font-black rounded-full bg-amber-100 text-amber-800 border border-amber-200/60 uppercase tracking-widest">
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
