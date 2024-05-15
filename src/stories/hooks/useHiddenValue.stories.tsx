import useHiddenValue from '@/hooks/useHiddenValue';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'hooks/useHiddenValue',
};

export default meta;

export const DefaultHidden = () => {
  const [originValue, setOriginValue] = useState('Jimmy Liao');
  const [value, display, hide] = useHiddenValue(originValue);

  const handleOriginValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOriginValue(event.target.value);
  };

  return (
    <Box display="grid" gap="16px" width="300px">
      <TextField
        id="origin-value"
        label="Origin Value"
        variant="standard"
        value={originValue}
        onChange={handleOriginValueChange}
      />
      <Typography>Value: {value}</Typography>
      <Box display="inline-grid" gridTemplateColumns="1fr 1fr" gap="6px">
        <Button variant="contained" onClick={display}>
          Display
        </Button>
        <Button variant="contained" onClick={hide}>
          Hide
        </Button>
      </Box>
    </Box>
  );
};
