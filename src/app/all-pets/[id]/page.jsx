import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import PetDetailsView from "@/components/PetDetailsView";

const DetailsPets = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petnest/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-[62vh] flex flex-col items-center justify-center gap-4 bg-[#FBF9F6]">
        <p className="text-sm font-bold text-neutral-400">
          Pet details not found.
        </p>
        <Link href="/">
          <Button size="sm">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const pet = await res.json();

  return (
    <section className="bg-orange-50/90 py-8">
      <div className="max-w-7xl mx-auto p-3 ">
        <p className="text-3xl font-bold items-center py-5">Details</p>
        <PetDetailsView pet={pet} id={id} />
      </div>
    </section>
  );
};

export default DetailsPets;
