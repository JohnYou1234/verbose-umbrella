import Search from './Search.js';
import Results from './Results.js';
import {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App(props) {
    return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search/>} />
          <Route path="/results/:name" element={
          <div>
            <Search />
            <Results/>
          </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
    )
}
export default App;
