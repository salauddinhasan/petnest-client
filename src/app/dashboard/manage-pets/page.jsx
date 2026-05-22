"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
        const res = await fetch(`${baseUrl}/pets`);
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPets();
  }, []);

  const handleDeletePet = async (id) => {
    if (confirm("Are you sure you want to remove this pet? 🐾")) {
      try {
        const session = await authClient.getSession();
        const token = session?.data?.token || "valid_token";

        const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
        const res = await fetch(`${baseUrl}/pets/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();
        if (result.success || res.ok) {
          toast.success("Pet deleted successfully! ");

          setPets(pets.filter((pet) => pet._id !== id));
        } else {
          toast.error("Failed to delete pet.");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  if (loading) return <div className="text-center p-12">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-black mb-6">Manage All Pets</h1>

      <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
        <table className="table w-full text-left">
          <thead className="bg-neutral-50 text-xs uppercase border-b">
            <tr>
              <th className="p-4">Pet Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {pets.map((pet) => (
              <tr key={pet._id} className="border-b">
                <td className="p-4">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                </td>
                <td className="p-4 font-bold">{pet.name}</td>
                <td className="p-4">{pet.category}</td>
                <td className="p-4 flex gap-2 mt-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/dashboard/manage-pets/edit/${pet._id}`)
                    }
                    className="px-3 py-1 bg-neutral-950 text-white text-xs font-bold rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDeletePet(pet._id)}
                    className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ManagePetsPage;
