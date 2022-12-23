import Search from './Search/Search.js';
import Matches from './Matches/Matches.js';
import DetailedMatch from './DetailedMatched/DetailedMatch.js';
import Header from './Header/Header.js'
import {Stack} from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App(props) {
    return (
    <div>
      <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/" element={<Search />}/>

            <Route path="/results/:name" element={
                <Matches/>
            } />

            <Route path="/match/:matchId" element={
              <DetailedMatch />
            } />
          </Routes>
      </BrowserRouter>
    </div>
    )
}
export default App;
