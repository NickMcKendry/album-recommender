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

const getAlbumFeatures = async (albumId, accessToken) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        market: "US",
      },
    }
  );

  const trackIds = response.data.items.map((track) => track.id).join(",");

  const featuresResponse = await axios.get(
    "https://api.spotify.com/v1/audio-features",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ids: trackIds,
      },
    }
  );

  return featuresResponse.data.audio_features;
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
      limit: 20, // Increase the limit to have more albums to choose from
    },
  });

  const albums = response.data.albums.items;

  // Fetch audio features for each album
  for (const album of albums) {
    album.features = await getAlbumFeatures(album.id, accessToken);

    album.avgDanceability =
      album.features.reduce((sum, feature) => sum + feature.danceability, 0) /
      album.features.length;
    album.avgEnergy =
      album.features.reduce((sum, feature) => sum + feature.energy, 0) /
      album.features.length;
  }

  // Sort the albums by their average danceability and energy
  albums.sort((a, b) => {
    return b.avgDanceability + b.avgEnergy - (a.avgDanceability + a.avgEnergy);
  });

  // Return top 2 albums
  return albums.slice(0, 2);
};
