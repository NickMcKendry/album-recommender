import React from "react";

const AlbumList = ({ albums }) => {
  return (
    <div className="album-list">
      {albums.map((album) => (
        <div key={album.id} className="album">
          <div className="album-cover">
            <img src={album.images[1]?.url} alt={album.name} />
          </div>
          <h3>{album.name}</h3>
          <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
