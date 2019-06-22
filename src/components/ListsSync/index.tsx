import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'store';
import { selectTrackedListIds } from 'store/lists';
import { selectIsOnline } from 'store/network';

import SingleListSync from './SingleListSync';

const actionCreators = {};

interface IOwnProps {}

interface IStateProps {
  listIds: string[];
  isOnline: boolean;
}

type IDispatchProps = typeof actionCreators;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const ListsSync: React.FC<IProps> = ({ listIds, isOnline }) => {
  return isOnline ? (
    <>
      {listIds.map(id => (
        <SingleListSync key={id} listId={id} />
      ))}
    </>
  ) : null;
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(state => ({
  listIds: selectTrackedListIds(state),
  isOnline: selectIsOnline(state),
}))(ListsSync);
