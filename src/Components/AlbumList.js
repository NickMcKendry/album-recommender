import React from 'react';

const AlbumList = ({ albums }) => {
  return (
    <div>
      {albums.map((album) => (
        <div key={album.id}>
          <img src={album.images[1]?.url} alt={album.name} />
          <h3>{album.name}</h3>
          <p>{album.artists.map((artist) => artist.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
