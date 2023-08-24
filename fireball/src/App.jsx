import "./App.css";

import { useDataContext } from "./hooks/useDataContext";
import Summary from "./components/summary/summary";

function App() {
  const { data, loading } = useDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      <Summary />
    </div>
  );
}

export default App;
