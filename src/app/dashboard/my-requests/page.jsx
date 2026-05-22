"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    try {
      const session = await authClient.getSession();
      console.log(session)
      const token = session?.data?.token || "valid_token";
      const userEmail = session?.data?.user?.email;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-requests?email=${userEmail}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`},
          cache: 'no-store',
        },
      );

      const result = await res.json();
      if (result.success || res.ok) {
        setRequests(result.data || result);
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleCancelRequest = async (id) => {
    if (confirm("Are you sure you want to cancel this adoption request? ")) {
      try {
        const session = await authClient.getSession();
        const token = session?.data?.token || "valid_token";

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const result = await res.json();

        if (result.success || res.ok) {
          toast.success("Request cancelled successfully! ");

          setRequests(requests.filter((req) => req._id !== id));
        } else {
          toast.error("Failed to cancel request.");
        }
      } catch (error) {
        console.error("Error cancelling request:", error);
        toast.error("Something went wrong!");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-neutral-950"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">
          My Adoption Requests
        </h1>
        <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white border border-neutral-200/60 p-8 rounded-2xl text-center text-neutral-400 font-medium text-sm shadow-sm">
          You have t submitted any adoption requests yet. 🐾
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-neutral-200/60">
          <table className="table w-full text-left border-collapse">
            <thead className="bg-neutral-50 text-neutral-950 font-black text-xs uppercase tracking-wider border-b border-neutral-200/60">
              <tr>
                <th className="p-4 font-black">Pet Name</th>
                <th className="p-4 font-black">Pickup Date</th>
                <th className="p-4 font-black">Status</th>
                <th className="p-4 font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-neutral-700">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-neutral-200/40 hover:bg-neutral-50/50 transition-all"
                >
                  <td className="p-4 font-bold text-neutral-800">
                    {req.petName || req.name || "Lovely Pet"}
                  </td>

                  <td className="p-4 text-neutral-600 font-medium">
                    {req.pickupDate || "Not Specified"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-[10px] font-black rounded-full border uppercase tracking-widest ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : req.status === "Rejected"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}
                    >
                      {req.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link href={`/all-pets/${req.petId}`}>
                      <button className="px-3 py-1 text-xs font-bold text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-all shadow-sm">
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => handleCancelRequest(req._id)}
                      className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all shadow-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* টোস্ট কন্টেইনার */}
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default MyRequestsPage;
