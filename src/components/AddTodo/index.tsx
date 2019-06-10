import React, { useCallback, useState } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { Key } from 'ts-key-enum';

interface IProps {
  onSubmit(text: string): void;
}

const AddTodo: React.FC<IProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback((): void => {
    if (inputValue) {
      onSubmit(inputValue);
      setInputValue('');
    }
  }, [onSubmit, inputValue]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => setInputValue(event.target.value),
    [setInputValue],
  );

  const handleInputKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === Key.Enter) {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <TextField
          placeholder="Add new TODO"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodo;
