import axios from "axios";

const getAccessToken = async () => {
  // Replace the following with your own Spotify API credentials
  const clientId = "9820a4403a664c5086bd15b29e2e6a7c";
  const clientSecret = "e1e92cf6f93e44e3947ad46ee4b9e15f";

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
      limit: 10,
    },
  });

  return response.data.albums.items;
};
