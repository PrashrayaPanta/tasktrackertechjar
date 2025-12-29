import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Create from "./Pages/Task/Create";
import Edit from "./Pages/Task/Edit";
import List from "./Pages/Task/List";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="task" element={<List />} />

            <Route path="task/add" element={<Create />} />

            <Route path="task/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
