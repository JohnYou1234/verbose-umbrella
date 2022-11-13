import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';
function Search(props) {
    const [summoner, changeSummoner] = useState("");
    let handleChange = (e) => {
      changeSummoner(e.target.value);
    }
    
    const SearchBtn = ({ classname }) => (
      <Link className={classname} to={"/results/" + summoner}><Button variant="primary" type="submit">Search</Button></Link>
    );
    return (
      <div className='search'>
        <Form onSubmit={async function(e) {
            e.preventDefault();
          }}>
            <Container>
              <Row>
                <Col>
                  <Form.Control
                      id='search-text'
                      type="text"
                      placeholder='Enter Summoner Name'
                      required={true}
                      value={summoner}
                      onChange={handleChange}
                  />
                </Col>
                <Col>
                  <SearchBtn />
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
    )
}

export default Search;