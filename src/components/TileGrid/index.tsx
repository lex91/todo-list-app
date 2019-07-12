import React from 'react';
import './tileGrid.css';
import Tile, { ITile } from '../Tile';

interface ITileGrid {
  list: ITile[];
  title: string;
}

const TileGrid: React.FC<ITileGrid> = ({ list, title }) => {
  return (
    <div className="TileGrid">
      <h1>{title}</h1>

      {list.map(({ title, backgroundUrl, rating, url }) => {
        console.log(title);
        return <Tile title={title} backgroundUrl={backgroundUrl} rating={rating} url={url} />;
      })}
    </div>
  );
};

export default TileGrid;
