import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, IBoundActionCreators } from 'utils/redux';
import { IRootState } from 'store';
import { epics } from 'store/lists';

const actionCreators = {
  watchList: epics.watchList,
  saveList: epics.saveList,
};

interface IOwnProps {
  listId: string;
}

interface IStateProps {
  shouldSave: boolean;
}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const ListSync: React.FC<IProps> = ({ listId, shouldSave, watchList, saveList }) => {
  useEffect(() => watchList(listId), [listId, watchList]);

  useEffect(() => {
    if (shouldSave) {
      saveList(listId);
    }
  }, [listId, shouldSave, saveList]);

  return null;
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(
  (state, ownProps) => {
    const listState = state.lists[ownProps.listId]!;
    return {
      shouldSave: Boolean(
        listState.hasLocalChanges && !listState.hasRemoteChanges && !listState.pending,
      ),
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch),
)(ListSync);
