"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; // ⚠️ Check your Better Auth client path here

const AdoptRequestPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
 
  useEffect(() => {
    const getSession = async () => {
      const session = await authClient.getSession();
      if (!session?.data) {
        alert("Session expired! Please login again.");
        router.push("/login");
      } else {
        // Set the token from session data
        setSessionToken(session?.data?.token || "valid_token");
      }
    };
    getSession();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const requesterPhone = form.phone.value;
    const requesterAddress = form.address.value;
    const message = form.message.value;

    // Prepare data object for MongoDB
    const requestData = {
      petId: id,
      requesterPhone,
      requesterAddress,
      message,
    };

    try {
      // 📡 Hit your Express backend route
      const res = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`, // 🔑 Secure Bearer Token
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (data.success || res.ok) {
        alert("Success! Adoption request submitted successfully. 🎉");
        router.push("/dashboard"); // Redirect to dashboard after success
      } else {
        alert(`Error: ${data.message || "Failed to submit request."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong! Failed to connect to the server.");
    } finally {
      setLoading(false);  
    }
  };

  // Show a clean loader while verifying session
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
          🐾 Adoption Request Form
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Phone Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500">Your Phone Number</label>
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
            <label className="text-xs font-bold text-neutral-500">Your Full Address</label>
            <input
              type="text"
              name="address"
              placeholder="e.g., Habiganj, Sylhet"
              className="border border-neutral-200 rounded-xl px-4 h-12 text-sm focus:outline-none focus:border-[#051242]"
              required
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500">Why do you want to adopt this pet?</label>
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
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdoptRequestPage;