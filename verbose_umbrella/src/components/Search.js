import {Form, Button} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
function Search(props) {
    const [summoner, changeSummoner] = useState("");
    const [link, changeLink] = useState("");
    let handleChange = (e) => {
      changeSummoner(e.target.value);
    }
    useEffect(() => {
      if (summoner.length > 0) {
        changeLink("/results/" + summoner);
      } else {
        changeLink("");
      }
    }, [summoner])
    
    const SearchBtn = ({classes}) => (
      <Link to={link}><Button className={classes} variant="primary" type="submit">Search</Button></Link>
    );

    return (
      <div className='search-box'>
        <h2>Verbose Umbrella</h2>
        <InputGroup className="mb-3">
          <Form.Control
            id='summoner-search'
            type="text"
            placeholder='Search Summoner'
            aria-label="Summoner's Search"
            onChange={handleChange}
            value={summoner}
          />
          <SearchBtn classes="search-btn"/>
        </InputGroup>
        </div>
    )
}
export default Search;