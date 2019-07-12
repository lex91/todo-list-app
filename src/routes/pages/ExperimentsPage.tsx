import React from 'react';
import TileGrid from 'components/TileGrid';

interface IProps {}

const list = new Array(43).fill({
  title: 'Внутри я танцую',
  backgroundUrl: '',
  rating: 10,
  url: 'http://www.imdb.com/title/tt0417791/',
});
const input = {
  list,
  title: 'HUYAMBA',
};
const ExperimentsPage: React.FC<IProps> = () => TileGrid(input);

export default ExperimentsPage;
