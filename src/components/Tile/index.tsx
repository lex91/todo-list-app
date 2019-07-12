import React from 'react';
import './tile.css';

export interface ITile {
  title: string;
  backgroundUrl: string;
  rating: number;
  url: string;
}

const ratingPreTitle: string = 'Рэйтинг';
const ratingPostTitle: string = 'из 10';
const Tile: React.FC<ITile> = ({ title, backgroundUrl, rating, url }) => {
  // const imgUrl = 'img.jpg';
  return (
    <div className="Tile">
      <a className="Tile-content" href={url} target="_blank" rel="noopener noreferrer">
        <h1>{title}</h1>
        <h2>
          {ratingPreTitle} {rating} {ratingPostTitle}
        </h2>
      </a>
    </div>
  );
};

export default Tile;
