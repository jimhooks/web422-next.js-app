import { getToken } from "./authenticate";

// ------------------------------
// GET FAVOURITES
// ------------------------------
export async function getFavourites() {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      "Authorization": `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

// ------------------------------
// ADD TO FAVOURITES
// ------------------------------
export async function addToFavourites(id) {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

// ------------------------------
// REMOVE FROM FAVOURITES
// ------------------------------
export async function removeFromFavourites(id) {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `JWT ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}
