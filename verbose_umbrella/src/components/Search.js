import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
function Search(props) {
    const [summoner, changeSummoner] = useState("");
    let handleChange = (e) => {
      changeSummoner(e.target.value);
    }
    
    const SearchBtn = ({ classname }) => (
      <Link className={classname} to={"/results/" + summoner}><Button variant="primary" type="submit">Search</Button></Link>
    );
    const StyledBtn = styled(SearchBtn)`
      font-color: blue;
    `
    return (
        <Form className="search" onSubmit={async function(e) {
            e.preventDefault();
          }}>
            <Form.Control
                type="text"
                placeholder='Enter Summoner Name'
                required={true}
                value={summoner}
                onChange={handleChange}
            />
            <StyledBtn />
          </Form>
    )
}

export default Search;