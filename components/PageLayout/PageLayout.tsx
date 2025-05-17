import Box from '@mui/material/Box';
import { GlobalHeader } from '../GlobalHeader/GlobalHeader';
import { GlobalFooter } from '../GlobalFooter/GlobalFooter';

const PageLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh" }} className="">
      <GlobalHeader></GlobalHeader>
      {children}
      <GlobalFooter></GlobalFooter>
    </Box>
  )
};

export default PageLayout;