"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";

const AdoptRequestPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [petName, setPetName] = useState("");

  useEffect(() => {
    const getSessionAndPet = async () => {
      const session = await authClient.getSession();
      if (!session?.data) {
        toast.error("Session expired! Please login again.");
        router.push("/login");
        return;
      }
      setSessionToken(session?.data?.token || "valid_token");

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/pets/${id}`);
        if (res.ok) {
          const petData = await res.json();
          setPetName(petData.name || petData.petName || "Lovely Pet");
        }
      } catch (err) {
        console.error("Error fetching pet info:", err);
      }
    };

    getSessionAndPet();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const requesterPhone = form.phone.value;
    const requesterAddress = form.address.value;
    const pickupDate = form.pickupDate.value;
    const message = form.message.value;

    const requestData = {
      petId: id,
      petName: petName,
      pickupDate,
      requesterPhone,
      requesterAddress,
      message,
      status: "pending",
    };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (data.success || res.ok) {
        toast.success("Success! Adoption request submitted successfully. ");

        setTimeout(() => {
          router.push("/dashboard/my-requests");
        }, 2000);
      } else {
        toast.error("Failed to submit request.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong! Failed to connect to the server.");
      setLoading(false);
    }
  };

  if (!sessionToken) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
        <span className="loading loading-spinner loading-lg text-[#051242]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center p-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-neutral-100">
        <h2 className="text-2xl font-black text-[#051242] mb-6 text-center tracking-wide uppercase">
          Adoption Request Form
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Phone Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500">
              Your Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 017XXXXXXXX"
              className="border border-neutral-200 rounded-xl px-4 h-12 text-sm focus:outline-none focus:border-[#051242]"
              required
            />
          </div>

          {/* Address Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500">
              Your Full Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="e.g., Habiganj, Sylhet"
              className="border border-neutral-200 rounded-xl px-4 h-12 text-sm focus:outline-none focus:border-[#051242]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500">
              Proposed Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              className="border border-neutral-200 rounded-xl px-4 h-12 text-sm focus:outline-none focus:border-[#051242] text-neutral-700"
              required
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500">
              Why do you want to adopt {petName}?
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message or reason here..."
              className="border border-neutral-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#051242] resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#051242] hover:bg-[#0b1c5e] text-white font-black text-sm tracking-widest uppercase h-12 rounded-xl shadow-md transition-all mt-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default AdoptRequestPage;
