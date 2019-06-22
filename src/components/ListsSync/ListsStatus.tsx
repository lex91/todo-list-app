import React, { useCallback, useRef, useState } from 'react';
import {
  Button,
  makeStyles,
  Theme,
  colors,
  Popover,
  Box,
  Typography,
  Paper,
  List,
} from '@material-ui/core';

import { IListsSyncInfo } from 'store/lists';

import ListStatusItem from './ListStatusItem';

export enum RecoveryStrategy {
  LOCAL,
  REMOTE,
  MERGE,
}

interface IProps {
  syncInfo: IListsSyncInfo;
  resolveConflict(id: string, strategy: RecoveryStrategy): void;
}

const ListsStatus: React.FC<IProps> = ({ syncInfo, resolveConflict }) => {
  const conflictsCount = syncInfo.conflicts.length;
  const unsavedCount = syncInfo.unsaved.length;

  const classes = useStyles();

  const buttonRef = useRef<HTMLButtonElement>();

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const handlePopoverClose = useCallback(() => {
    setPopoverOpen(false);
  }, [setPopoverOpen]);
  const handleButtonClick = useCallback(() => {
    setPopoverOpen(conflictsCount + unsavedCount > 0);
  }, [setPopoverOpen, conflictsCount, unsavedCount]);

  const handleResolveConflict = useCallback(
    (id: string, strategy: RecoveryStrategy) => {
      resolveConflict(id, strategy);
      setPopoverOpen(false);
    },
    [resolveConflict],
  );

  return (
    <>
      <Button
        buttonRef={buttonRef}
        variant="contained"
        color="secondary"
        className={conflictsCount === 0 ? classes.buttonOk : undefined}
        onClick={handleButtonClick}
      >
        <Box>
          <div>Conflicts: {conflictsCount}</div>
          <div>Unsaved: {unsavedCount}</div>
        </Box>
      </Button>
      <Popover
        open={isPopoverOpen}
        anchorEl={buttonRef.current}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper>
          <List>
            {syncInfo.conflicts.map(id => (
              <ListStatusItem
                key={id}
                id={id}
                status={
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleResolveConflict(id, RecoveryStrategy.REMOTE)}
                    >
                      use remote
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleResolveConflict(id, RecoveryStrategy.LOCAL)}
                    >
                      use local
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleResolveConflict(id, RecoveryStrategy.MERGE)}
                    >
                      merge
                    </Button>
                  </>
                }
              />
            ))}
            {syncInfo.unsaved.map(id => (
              <ListStatusItem
                key={id}
                id={id}
                status={<Typography variant="h5">Saving...</Typography>}
              />
            ))}
          </List>
        </Paper>
      </Popover>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  buttonOk: {
    color: theme.palette.getContrastText(colors.green[800]),
    backgroundColor: colors.green[800],
    '&:hover': {
      backgroundColor: colors.green[900],
    },
  },
}));

export default ListsStatus;
