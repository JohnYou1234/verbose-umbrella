import Search from './Search.js';
import Results from './Results.js';
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
        <Stack>
          <Routes>
            <Route path="/" element={<Search />}/>

            <Route path="/results/:name" element={
                <Results />
            } />
          </Routes>
        </Stack>
      </BrowserRouter>
    </div>
    )
}
export default App;
