import "./App.css";
import { useDataContext } from "./hooks/useDataContext";

function App() {
  const { data, loading } = useDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return <></>;
}

export default App;
