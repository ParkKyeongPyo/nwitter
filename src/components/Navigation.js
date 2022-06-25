import {Link} from 'react-router-dom';

function Navigation(){
    return(
        <div>
            <button><Link to="/">Home</Link></button>
            <button> <Link to="/profile">Profile</Link></button>
        </div>
    );
}

export default Navigation;