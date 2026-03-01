function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <span className="brand-icon">🏠</span> PropertyFinder
                        </h3>
                        <p className="footer-text">
                            Find your dream property in Bangalore and Mumbai.
                            We help you discover the best homes, apartments, villas, and plots.
                        </p>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-subtitle">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/properties?type=buy">Buy Property</a></li>
                            <li><a href="/properties?type=rent">Rent Property</a></li>
                            <li><a href="/properties?city=Bangalore">Bangalore</a></li>
                            <li><a href="/properties?city=Mumbai">Mumbai</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-subtitle">Property Types</h4>
                        <ul className="footer-links">
                            <li><a href="/properties?property_type=Apartment">Apartments</a></li>
                            <li><a href="/properties?property_type=Villa">Villas</a></li>
                            <li><a href="/properties?property_type=Plot">Plots</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-subtitle">Contact</h4>
                        <ul className="footer-links">
                            <li>📧 info@propertyfinder.in</li>
                            <li>📞 +91 98765 43210</li>
                            <li>📍 Bangalore, India</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 PropertyFinder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
