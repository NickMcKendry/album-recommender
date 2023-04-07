import axios from "axios";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    }
  );

  return response.data.access_token;
};

export const searchAlbums = async (query) => {
  const accessToken = await getAccessToken();

  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: query,
      type: "album",
      market: "US",
      release_date: "1960-01-01,1979-12-31",
      release_date_precision: "year",
      limit: 2,
    },
  });

  return response.data.albums.items;
};
