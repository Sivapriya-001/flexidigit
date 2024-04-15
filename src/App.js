import { Route, Routes } from "react-router-dom";
import './App.css';
import Details from './components/details';
import TableComponent from './components/tableComponent';

function App() {
  return (
    <div className="App">

      {/* <Details />
      <TableComponent/> */}
      <Routes>
        <Route path="/" element={<Details/>}></Route>
        <Route path="tableComponent" element={<TableComponent/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
