import GlobalContainer from "@/components/GlobalContainer/GlobalContainer";
import PageLayout from "@/components/PageLayout/PageLayout";
import ThoughtCreator from "@/components/ThoughtCreator/ThoughtCreator";
import { ThoughtProvider } from "@/provider/ThoughtContext";
import { Box } from "@mui/material";

const Create = () => {
  return (
    <PageLayout>
      <Box component="main" className="" sx={{ background: "#000814", color: "white" }}>
        <GlobalContainer component="section">
          <ThoughtProvider>
            <Box className="pb-24 pt-5 md:pb-32 lg:pb-56 lg:pt-44" sx={{ margin: "0 auto", maxWidth: "100vw", marginTop: { md: "20px", xs: "20px" } }}>
              <ThoughtCreator />
            </Box>
          </ThoughtProvider>   
        </GlobalContainer>
      </Box>
    </PageLayout>
  );
}

export default Create;