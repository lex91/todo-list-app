import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'store';
import { selectIsOnline, setOnline } from 'store/network';
import { IBoundActionCreators } from 'utils/redux';

import NetworkStatusComponent from './NetworkStatusComponent';

const actionCreators = {
  setOnline,
};

interface IOwnProps {}

interface IStateProps {
  isOnline: boolean;
}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const NetworkStatusContainer: React.FC<IProps> = ({ isOnline, setOnline }) => {
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [setOnline]);

  const handleReconnect = useCallback(() => {
    setOnline(true);
  }, [setOnline]);

  return <NetworkStatusComponent isOnline={isOnline} onReconnect={handleReconnect} />;
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(
  state => ({
    isOnline: selectIsOnline(state),
  }),
  actionCreators,
)(NetworkStatusContainer);
