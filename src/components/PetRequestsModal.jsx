"use client";

import React, { useState, useEffect } from "react";

const PetRequestsModal = ({ petId, onClose, onStatusUpdated }) => {
  const [petRequests, setPetRequests] = useState([]);
  const [fetchingRequests, setFetchingRequests] = useState(false);
 
  useEffect(() => {
    if (!petId) return;

    const fetchPetRequests = async () => {
      setFetchingRequests(true);
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/requests?petId=${petId}`);
        const result = await res.json();

        if (Array.isArray(result)) {
          setPetRequests(result.filter((req) => req.petId === petId));
        } else if (result.success && Array.isArray(result.data)) {
          setPetRequests(result.data.filter((req) => req.petId === petId));
        } else {
          setPetRequests([]);
        }
      } catch (error) {
        console.error("Error fetching pet requests:", error);
        setPetRequests([]);
      } finally {
        setFetchingRequests(false);
      }
    };

    fetchPetRequests();
  }, [petId]);

  return (
    <dialog id="requests_modal" className="modal modal-bottom sm:modal-middle mx-auto my-5">
      <div className="modal-box max-w-2xl bg-white border border-neutral-200 rounded-2xl p-6">
        <h3 className="font-black text-xl text-neutral-950 mb-4 flex items-center gap-2">
          Adoption Requests Received 
        </h3>

        <div className="py-2">
          {fetchingRequests ? (
            <div className="flex items-center justify-center p-6">
              <span className="loading loading-spinner loading-md text-sky-600"></span>
            </div>
          ) : petRequests.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-6 font-medium">
              No one has requested to adopt this pet yet.
            </p>
          ) : (
            <div className="overflow-x-auto max-h-60 border border-neutral-100 rounded-xl">
              <table className="table w-full text-left text-xs">
                <thead className="bg-neutral-50 font-bold text-neutral-700 border-b">
                  <tr>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Pickup Date</th>
                    <th className="p-3 text-center">Action / Status</th>
                  </tr>
                </thead>
                <tbody>
                  {petRequests.map((req) => (
                    <tr
                      key={req._id}
                      className="border-b last:border-0 hover:bg-neutral-50/50"
                    >
                      <td className="p-3 font-semibold text-neutral-950">
                        {req.requesterPhone}
                      </td>
                      <td className="p-3 text-neutral-500 truncate max-w-[120px]">
                        {req.requesterAddress}
                      </td>
                      <td className="p-3 font-medium text-neutral-600">
                        {req.pickupDate || "Not Specified"}
                      </td>
                      <td className="p-3 flex justify-center gap-1.5">
                        {req.status === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                onStatusUpdated(
                                  req._id,
                                  "approved",
                                  req.petId,
                                  setPetRequests,
                                )
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                onStatusUpdated(
                                  req._id,
                                  "rejected",
                                  req.petId,
                                  setPetRequests,
                                )
                              }
                              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded transition-all"
                            >
                              Reject ✕
                            </button>
                          </>
                        ) : (
                          <span
                            className={`font-black uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${
                              req.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {req.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="modal-action mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PetRequestsModal;
