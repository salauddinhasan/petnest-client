// all pets ar arjono sob tada tekhabe
export const fetchPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/petnest`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};

// home page ar featured ar jonno
export const fetchFeaturedPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || {};
};
