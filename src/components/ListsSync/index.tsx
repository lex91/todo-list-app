import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'store';
import { selectTrackedListIds } from 'store/lists';

import SingleListSync from './SingleListSync';

const actionCreators = {};

interface IOwnProps {}

interface IStateProps {
  listIds: string[];
}

type IDispatchProps = typeof actionCreators;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const ListsSync: React.FC<IProps> = ({ listIds }) => {
  return (
    <>
      {listIds.map(id => (
        <SingleListSync key={id} listId={id} />
      ))}
    </>
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(state => ({
  listIds: selectTrackedListIds(state),
}))(ListsSync);
