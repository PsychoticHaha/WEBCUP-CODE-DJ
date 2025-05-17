import Box from '@mui/material/Box';

const PageLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh" }} className="">
      {children}
    </Box>
  )
};

export default PageLayout;