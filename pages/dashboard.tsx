import { useEmotion } from "@/hooks/useEmotion";

const Dashboard = () => {
  const message = useEmotion("C'est un test de message pour générer une émotion avec OpenAI.");

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Emotion: {message}</h1>
    </div>
  );
}

export default Dashboard;