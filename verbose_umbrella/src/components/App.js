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
    <div className='input'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <Search/>
            </div>
          } />
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
