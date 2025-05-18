import GlobalContainer from "@/components/GlobalContainer/GlobalContainer";
import PageLayout from "@/components/PageLayout/PageLayout";
import { useEmotion } from "@/hooks/useEmotion";
import { Box } from "@mui/material";

const Dashboard = () => {
  const {emotion} = useEmotion("C'est un test de message pour générer une émotion avec OpenAI.");

  return (
    <PageLayout>
      <Box component="main" className="" sx={{ background: "#000814", color: "white" }}>
        <GlobalContainer component="section">
          <Box className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44" sx={{ margin: "0 auto", maxWidth: "100vw", marginTop: { md: "74px", xs: "74px" } }}>
            <h1 className="">{emotion}</h1>
          </Box>

        </GlobalContainer>

      </Box>

    </PageLayout>
  );
}

export default Dashboard;