import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { IRootState } from 'store';
import {
  overwriteRemoteListState,
  overwriteLocalListState,
  IListsSyncInfo,
  selectListsSyncInfo,
  selectTrackedListIds,
} from 'store/lists';
import { selectIsOnline } from 'store/network';
import { IBoundActionCreators } from 'utils/redux';

import ListSync from './ListSync';
import ListsStatus, { RecoveryStrategy } from './ListsStatus';

const actionCreators = {
  overwriteLocalListState,
  overwriteRemoteListState,
};

interface IOwnProps extends RouteComponentProps {}

interface IStateProps {
  listIds: string[];
  isOnline: boolean;
  syncInfo: IListsSyncInfo;
}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const ListsSync: React.FC<IProps> = ({
  listIds,
  isOnline,
  syncInfo,
  overwriteLocalListState,
  overwriteRemoteListState,
  history,
}) => {
  const handleResolveConflict = useCallback(
    (id: string, strategy: RecoveryStrategy) => {
      switch (strategy) {
        case RecoveryStrategy.LOCAL:
          overwriteRemoteListState(id);
          break;
        case RecoveryStrategy.REMOTE:
          overwriteLocalListState(id);
          break;
        case RecoveryStrategy.MERGE:
          history.push(`/${id}/merge`);
          break;
        default:
          console.warn('unknown strategy');
      }
    },
    [overwriteLocalListState, overwriteRemoteListState, history],
  );
  return (
    <>
      <ListsStatus syncInfo={syncInfo} resolveConflict={handleResolveConflict} />
      {isOnline && listIds.map(id => <ListSync key={id} listId={id} />)}
    </>
  );
};

export default withRouter(
  connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(
    state => ({
      listIds: selectTrackedListIds(state),
      isOnline: selectIsOnline(state),
      syncInfo: selectListsSyncInfo(state),
    }),
    actionCreators,
  )(ListsSync),
);
