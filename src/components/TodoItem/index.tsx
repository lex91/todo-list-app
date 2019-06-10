import React from 'react';
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

interface IProps {
  text: string;
  isDone: boolean;
  onClick(): void;
  onDelete(): void;
}

const TodoItem: React.FC<IProps> = ({ text, isDone, onClick, onDelete }) => (
  <ListItem component="div" button divider disableRipple onClick={onClick}>
    <ListItemIcon>
      <Checkbox edge="end" checked={isDone} />
    </ListItemIcon>
    <ListItemText primary={text} />
    <ListItemSecondaryAction>
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default TodoItem;
