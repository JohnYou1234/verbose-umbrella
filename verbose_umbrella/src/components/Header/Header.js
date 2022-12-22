import {Link} from 'react-router-dom';
import './header.css';
import SearchBar from '../Search/Search.js';
function Header(props) {
    return (
        <div className="header">
            <h1 id='header-title'><Link style={{ textDecoration: 'none' }} to="/" relative="path">Verbose</Link></h1>
        </div>
    )
}

export default Header;