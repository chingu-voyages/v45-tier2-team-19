
import "./App.css";
import Body from './layout/Body'

import { useDataContext } from "./hooks/useDataContext";

function App() {
  const { data, loading } = useDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (

    <Body />

  );

}

export default App;
