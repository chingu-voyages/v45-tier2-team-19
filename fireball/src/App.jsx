import "./App.css";
import { useDataContext } from "./hooks/useDataContext";
import DataSets from "./components/detailsDisplay/DataSets";

function App() {
  const { data, loading } = useDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <>
      <DataSets />
    </>
  );
}

export default App;
