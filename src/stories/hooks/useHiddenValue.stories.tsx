import useHiddenValue from '@/hooks/useHiddenValue';
import { Box, Button, Typography } from '@mui/material';

const meta = {
  title: 'hooks/useHiddenValue',
};

export default meta;

interface HooksTemplateProps {
  defaultHide: boolean;
}
const Template = ({ defaultHide }: HooksTemplateProps) => {
  const [value, display, hide] = useHiddenValue('Jimmy Liao', defaultHide);

  return (
    <>
      <Typography>{value}</Typography>
      <Box
        display="inline-grid"
        gridTemplateColumns="auto auto"
        gap="6px"
        marginTop="6px"
      >
        <Button variant="contained" onClick={display}>
          Display
        </Button>
        <Button variant="contained" onClick={hide}>
          Hide
        </Button>
      </Box>
    </>
  );
};

export const DefaultHidden = () => {
  return <Template defaultHide={true} />;
};

export const DefaultDisplay = () => {
  return <Template defaultHide={false} />;
};
