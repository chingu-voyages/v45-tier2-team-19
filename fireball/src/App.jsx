
import "./App.css";
import Body from './layout/Body'

import { useDataContext } from "./hooks/useDataContext";

function App() {
  const { data, loading } = useDataContext();



  console.log(data);

  return (

    <Body loading={loading} />

  );

}

export default App;
