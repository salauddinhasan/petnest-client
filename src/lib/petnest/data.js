export const fetchPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petnest`, {
    cache: "no-store",
  });
  const data = res.json();
  return data || [];
};


export const fetchFeaturedPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, {
    cache: 'no-store',
  });
  const data = res.json();
  return data || {};
};