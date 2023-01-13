
import {Form, Button} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './search.css';
function Search(props) {
    const [summoner, changeSummoner] = useState("");
    const navigate = useNavigate();
    const handleOnSubmit = (summoner) => { 
      let path = `newPath`; 
      if (summoner.length > 0) {
        path = "/results/" + summoner;
      } else {
        path = "";
      }
      navigate(path);
    }
    let handleInput = (e) => {
      changeSummoner(e.target.value);
    }

    const SearchBtn = ({classes}) => (
      <Button onClick={() => handleOnSubmit(summoner)} className={classes} variant="primary" type="submit">Search</Button>
    );

    return (
      <div className='search-box'>
        <h2>LOL Search</h2>
        <InputGroup as="form" className="mb-3" onSubmit={() => handleOnSubmit(summoner)} id='form-box'>
            <Form.Control
              id='summoner-search'
              type="text"
              placeholder='Enter name (try "park garage")'
              aria-label="Summoner's Search"
              onChange={handleInput}
              value={summoner}
            />
            <SearchBtn classes="search-btn"/>
        </InputGroup>
      </div>
    )
}
export default Search;