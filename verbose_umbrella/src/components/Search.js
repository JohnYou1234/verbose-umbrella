import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';
function Search(props) {
    const [summoner, changeSummoner] = useState("");
    let handleChange = (e) => {
      changeSummoner(e.target.value);
    }
    
    return (
        <Form className="input" onSubmit={async function(e) {
            e.preventDefault();
          }}>
            <Form.Control
                type="text"
                placeholder='Enter Summoner Name'
                required={true}
                value={summoner}
                onChange={handleChange}
            />
            <Link to={"/results/" + summoner}><Button variant="primary" type="submit">Search</Button></Link>
          </Form>
    )
}

export default Search;