"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

const AddPetsPage= () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const petData = {
      name: form.name.value,
      species: form.species.value,
      breed: form.breed.value,
      age: parseFloat(form.age.value),
      gender: form.gender.value,
      image: form.image.value,
      healthStatus: form.healthStatus.value,
      vaccinationStatus: form.vaccinationStatus.value,
      location: form.location.value,
      adoptionFee: parseFloat(form.adoptionFee.value),
      description: form.description.value,
      ownerEmail: session?.user?.email,
      status: "available",
      createdAt: new Date(),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(petData),
    });

    if (res.ok) {
      toast.success("Pet added!");
      router.push("/dashboard/my-listings");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-black text-neutral-950 tracking-tight">
            Add a Pet
          </h1>
          <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
        </div>

        <div className="bg-white border border-neutral-200/60 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Pet Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Bruno"
                className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Species *
                </label>
                <select
                  name="species"
                  required
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                >
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Rabbit</option>
                  <option>Fish</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Breed *
                </label>
                <input
                  type="text"
                  name="breed"
                  required
                  placeholder="e.g. Labrador"
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Age (years) *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="0"
                  step="0.1"
                  placeholder="e.g. 2"
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Gender *
                </label>
                <select
                  name="gender"
                  required
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Unknown</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                required
                placeholder="https://i.ibb.co/your-image"
                className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Health Status *
                </label>
                <select
                  name="healthStatus"
                  required
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                >
                  <option>Healthy</option>
                  <option>Sick</option>
                  <option>Under Treatment</option>
                  <option>Recovering</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Vaccination *
                </label>
                <select
                  name="vaccinationStatus"
                  required
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                >
                  <option>Vaccinated</option>
                  <option>Not Vaccinated</option>
                  <option>Not Required</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Dhaka"
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Adoption Fee (৳) *
                </label>
                <input
                  type="number"
                  name="adoptionFee"
                  required
                  min="0"
                  placeholder="0 for free"
                  className="w-full h-11 px-4 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Tell us about this pet..."
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400 transition-all resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Owner Email
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                readOnly
                className="w-full h-11 px-4 bg-neutral-100 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-400 outline-none cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-neutral-950 hover:bg-neutral-800 text-white font-black text-sm rounded-xl transition-all mt-2"
            >
              Add Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPetsPage;
