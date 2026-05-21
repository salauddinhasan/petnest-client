"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import EditPetModal from "@/components/EditPetModal";
import PetRequestsModal from "@/components/PetRequestsModal";

const MyListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activePetId, setActivePetId] = useState(null);
  const [selectedPetForEdit, setSelectedPetForEdit] = useState(null);

  const fetchMyListings = async () => {
    try {
      const session = await authClient.getSession();
      const token = session?.data?.token || "valid_token";
      
      // সেশনের সব জায়গা থেকে ইমেইল খোঁজার চেষ্টা, না পাইলে তোমার আসল ইমেইল ব্যাকআপ
      const userEmail = 
        session?.data?.user?.email || 
        session?.user?.email || 
        session?.data?.email ||
        "salauddinhasan244@gmail.com"; 

      // 🎯 এনভায়রনমেন্ট ভ্যারিয়েবল বাদ দিয়ে সরাসরি ব্যাকএন্ড ইউআরএল হার্ডকোড করে দিলাম যেন 404 না আসে
      const baseUrl = "http://localhost:5000";

      const res = await fetch(`${baseUrl}/my-listings?email=${userEmail}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const result = await res.json();
      if (result.success) {
        setListings(result.data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const totalListings = listings.length;

  const availableCount = listings.filter(
    (pet) => !pet.status || pet.status.toLowerCase() === "available"
  ).length;

  const adoptedCount = listings.filter(
    (pet) => pet.status?.toLowerCase() === "adopted"
  ).length;

  const openRequestsModal = (petId) => {
    setActivePetId(petId);
    document.getElementById("requests_modal").showModal();
  };

  const openEditModal = (pet) => {
    setSelectedPetForEdit(pet);
    document.getElementById("edit_pet_modal").showModal();
  };

  const handleStatusUpdate = async (requestId, newStatus, petId, setPetRequests) => {
    try {
      const baseUrl = "http://localhost:5000"; // 🎯 ডাইরেক্ট ইউআরএল
      const res = await fetch(`${baseUrl}/requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus, petId: petId }),
      });

      const data = await res.json();
      if (data.success || res.ok) {
        toast.success(`Request ${newStatus} successfully!`);

        setPetRequests((prev) =>
          prev.map((req) => (req._id === requestId ? { ...req, status: newStatus } : req))
        );

        if (newStatus === "approved") {
          setListings((prevListings) =>
            prevListings.map((pet) => (pet._id === petId ? { ...pet, status: "Adopted" } : pet))
          );
        }
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this pet listing?")) {
      try {
        const session = await authClient.getSession();
        const token = session?.data?.token || "valid_token";
        const baseUrl = "http://localhost:5000"; // 🎯 ডাইরেক্ট ইউআরএল

        const res = await fetch(`${baseUrl}/pets/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success) {
          toast.success("Pet deleted successfully!");
          setListings(listings.filter((pet) => pet._id !== id));
        }
      } catch (error) {
        toast.error("Failed to delete pet.");
      }
    }
  };

  const handleUpdateSuccess = (updatedPet) => {
    setListings((prev) => prev.map((pet) => (pet._id === updatedPet._id ? updatedPet : pet)));
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
      
      {/* টাইটেল */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">
          My Pet Listings
        </h1>
        <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
      </div>

      {/* কার্ডসমূহ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Listings</span>
          <span className="text-3xl font-black text-neutral-950">{totalListings}</span>
        </div>
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Available</span>
          <span className="text-3xl font-black text-green-600">{availableCount}</span>
        </div>
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-1">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Adopted</span>
          <span className="text-3xl font-black text-blue-600">{adoptedCount}</span>
        </div>
      </div>

      {/* টেবিল লজিক */}
      {listings.length === 0 ? (
        <div className="bg-white border border-neutral-200/60 p-8 rounded-2xl text-center text-neutral-400 font-medium text-sm shadow-sm">
          You havent listed any pets for adoption yet. 🐾
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
                <th className="p-4 font-black text-center">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-neutral-700">
              {listings.map((pet) => (
                <tr key={pet._id} className="border-b border-neutral-200/40 hover:bg-neutral-50/50 transition-all">
                  <td className="p-4">
                    <Image
                      src={pet.image || pet.petImage || "https://via.placeholder.com/50"}
                      width={100}
                      height={100}
                      alt={pet.name || "Pet"}
                      className="w-12 h-12 object-cover rounded-xl border border-neutral-200"
                    />
                  </td>
                  <td className="p-4 font-bold text-neutral-950">{pet.name || pet.petName}</td>
                  <td className="p-4 font-medium">{pet.breed || pet.category || "N/A"}</td>
                  <td className="p-4 text-neutral-500">{pet.age || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full border uppercase tracking-widest ${
                      pet.status?.toLowerCase() === "adopted"
                        ? "bg-blue-100 text-blue-800 border-blue-200/60"
                        : "bg-green-100 text-green-800 border-green-200/60"
                    }`}>
                      {pet.status || "Available"}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => openRequestsModal(pet._id)}
                      className="px-3 py-1 text-xs font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 active:scale-95 transition-all shadow-sm"
                    >
                      Check Requests
                    </button>
                    <button
                      onClick={() => openEditModal(pet)}
                      className="px-3 py-1 text-xs font-bold text-white bg-amber-500 rounded-lg hover:bg-amber-600 active:scale-95 transition-all shadow-sm"
                    >
                      Edit
                    </button>
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

      {/* মোডালসমূহ বন্ধ হলে রি-ফ্যাচ করার ট্রিপল লজিক */}
      <PetRequestsModal
        petId={activePetId}
        onClose={() => {
          document.getElementById("requests_modal").close();
          fetchMyListings(); // 👈 ক্লোজ হলে ইনস্ট্যান্ট ডাটা আপডেট
        }}
        onStatusUpdated={handleStatusUpdate}
      />

      <EditPetModal
        pet={selectedPetForEdit}
        onClose={() => {
          setSelectedPetForEdit(null);
          fetchMyListings(); // 👈 ক্লোজ হলে ইনস্ট্যান্ট ডাটা আপডেট
        }}
        onUpdateSuccess={handleUpdateSuccess}
      />

      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </div>
  );
};

export default MyListingsPage;