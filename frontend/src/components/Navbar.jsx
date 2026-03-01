import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🏠</span>
                    <span className="brand-text">Property<span className="brand-highlight">Finder</span></span>
                </Link>
                <div className="navbar-links">
                    <Link to="/properties?type=buy" className="nav-link">Buy</Link>
                    <Link to="/properties?type=rent" className="nav-link">Rent</Link>
                    <Link to="/properties" className="nav-link">All Properties</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
