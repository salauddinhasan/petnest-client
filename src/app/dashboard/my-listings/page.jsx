"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";

const MyListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyListings = async () => {
    try {
      const session = await authClient.getSession();
      const token = session?.data?.token || "valid_token";

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/my-listings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setListings(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchMyListings();
    
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this pet listing?")) {
      try {
        const session = await authClient.getSession();
        const token = session?.data?.token || "valid_token";
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${baseUrl}/pets/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success) {
          toast("Pet deleted successfully! ");

          setListings(listings.filter((pet) => pet._id !== id));
        }
      } catch (error) {
        console.error("Error deleting pet:");
        toast.error("Failed to delete pet.");
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
          My Pet Listings
        </h1>
        <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
      </div>

      {listings.length === 0 ? (
        <div className="bg-white border border-neutral-200/60 p-8 rounded-2xl text-center text-neutral-400 font-medium text-sm shadow-sm">
          You haven t listed any pets for adoption yet. 🐾
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-neutral-200/60">
          <table className="table w-full text-left border-collapse">
            <thead className="bg-neutral-50 text-neutral-950 font-black text-xs uppercase tracking-wider border-b border-neutral-200/60">
              <tr>
                <th className="p-4 font-black">Pet Image</th>
                <th className="p-4 font-black">Pet Name</th>
                <th className="p-4 font-black">Breed / Category</th>
                <th className="p-4 font-black">Age</th>
                <th className="p-4 font-black">Status</th>
                <th className="p-4 font-black">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-neutral-700">
              {listings.map((pet) => (
                <tr
                  key={pet._id}
                  className="border-b border-neutral-200/40 hover:bg-neutral-50/50 transition-all"
                >
                  <td className="p-4">
                    <Image
                      src={
                        pet.image ||
                        pet.petImage ||
                        "https://via.placeholder.com/50"
                      }
                      width={100}
                      height={100}
                      alt={pet.name}
                      className="w-12 h-12 object-cover rounded-xl border border-neutral-200"
                    />
                  </td>

                  <td className="p-4 font-bold text-neutral-950">
                    {pet.name || pet.petName}
                  </td>

                  <td className="p-4 font-medium">
                    {pet.breed || pet.category || "N/A"}
                  </td>

                  <td className="p-4 text-neutral-500">{pet.age || "N/A"}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 text-[10px] font-black rounded-full bg-green-100 text-green-800 border border-green-200/60 uppercase tracking-widest">
                      Available
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all shadow-sm"
                    >
                      Delete
                    </button>
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

export default MyListingsPage;
