import React from "react";
import "../App.css";

const AlbumList = ({ albums }) => {
  return (
    <div className="album-container">
      {albums.map((album) => (
        <div key={album.id} className="album">
          <div className="record-cover">
            <img src={album.images[1]?.url} alt={album.name} />
            <h3>{album.name}</h3>
            <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
            <p>Released: {album.release_date}</p>
          </div>
          <div className="record">
            <div className="record-label">
              <p>{album.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
