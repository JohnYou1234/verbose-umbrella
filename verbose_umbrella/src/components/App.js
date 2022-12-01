import Search from './Search.js';
import Matches from './Matches/Matches.js';
import Header from './Header.js'
import {Stack} from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App(props) {
    return (
    <div>
      <Header />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />}/>

            <Route path="/results/:name" element={
                <Matches/>
            } />
          </Routes>
      </BrowserRouter>
    </div>
    )
}
export default App;
