import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import PetDetailsView from "@/components/PetDetailsView";
import PetReviews from "@/components/PetReviews";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DetailsPets = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petnest/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
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
    <section className="bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto p-3 ">
        <p className="text-3xl font-bold items-center py-5">Details</p>

        <PetDetailsView pet={pet} id={id} token={token} />

        <PetReviews />
      </div>
    </section>
  );
};

export default DetailsPets;
