"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditPetModal = ({ pet, onClose, onUpdateSuccess }) => {
  const [editPet, setEditPet] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (pet) {
      setEditPet({ ...pet });
      document.getElementById("edit_pet_modal")?.showModal();
    }
  }, [pet]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/pets/${editPet._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editPet),
      });

      const result = await res.json();
      if (result.success || res.ok) {
        toast.success("Pet updated successfully! ");
        onUpdateSuccess(editPet);
        handleClose();
      } else {
        toast.error("Failed to update pet.");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.error("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  const handleClose = () => {
    document.getElementById("edit_pet_modal")?.close();
    setEditPet(null);
    onClose();
  };

  return (
    <dialog id="edit_pet_modal" className="modal modal-bottom sm:modal-middle mx-auto my-5">
      <div className="modal-box max-w-md bg-white border border-neutral-200 rounded-2xl p-6">
        <h3 className="font-black text-xl text-neutral-950 mb-4 flex items-center gap-2">
          Edit Pet Information
        </h3>

        {editPet && (
          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col gap-4 text-sm"
          >
            <div className="form-control">
              <label className="label font-bold text-neutral-700">
                Pet Name
              </label>
              <input
                type="text"
                value={editPet.name || editPet.petName || ""}
                onChange={(e) =>
                  setEditPet({
                    ...editPet,
                    name: e.target.value,
                    petName: e.target.value,
                  })
                }
                className="input input-bordered w-full bg-white text-neutral-950 rounded-xl border-neutral-300 focus:outline-neutral-950"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-neutral-700">
                Breed / Category
              </label>
              <input
                type="text"
                value={editPet.breed || editPet.category || ""}
                onChange={(e) =>
                  setEditPet({
                    ...editPet,
                    breed: e.target.value,
                    category: e.target.value,
                  })
                }
                className="input input-bordered w-full bg-white text-neutral-950 rounded-xl border-neutral-300 focus:outline-neutral-950"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-neutral-700">Age</label>
              <input
                type="text"
                value={editPet.age || ""}
                onChange={(e) =>
                  setEditPet({ ...editPet, age: e.target.value })
                }
                className="input input-bordered w-full bg-white text-neutral-950 rounded-xl border-neutral-300 focus:outline-neutral-950"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-neutral-700">
                Image URL
              </label>
              <input
                type="text"
                value={editPet.image || editPet.petImage || ""}
                onChange={(e) =>
                  setEditPet({
                    ...editPet,
                    image: e.target.value,
                    petImage: e.target.value,
                  })
                }
                className="input input-bordered w-full bg-white text-neutral-950 rounded-xl border-neutral-300 focus:outline-neutral-950"
                required
              />
            </div>

            <div className="modal-action flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition-all disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default EditPetModal;
