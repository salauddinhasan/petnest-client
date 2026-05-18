// all pets ar arjono sob tada tekhabe 
export const fetchPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petnest`, {
    cache: "no-store",
  });
  const data = res.json();
  return data || [];
};

// home page ar featured ar jonno

export const fetchFeaturedPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, {
    cache: 'no-store',
  });
  const data = res.json();
  return data || {};
};


// fetch Details ar jonno
// const fetchDetails = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petnest/${id}`, {
//     cache: "no-store",
//   });
//   const data = res.json();
//   return data || [];
// };