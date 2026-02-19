import { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [showBlack, setShowBlack] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowBlack(true);
            } else {
                setShowBlack(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`navbar ${showBlack ? 'black' : ''}`}>
            <div className="navbar-left">
                <div className="navbar-logo">NETFLIX</div>
                <ul className="navbar-links">
                    <li className="navbar-link">Home</li>
                    <li className="navbar-link">TV Shows</li>
                    <li className="navbar-link">Movies</li>
                    <li className="navbar-link">New & Popular</li>
                    <li className="navbar-link">My List</li>
                </ul>
            </div>
            <div className="navbar-right">
                <Search size={20} style={{ cursor: 'pointer' }} />
                <Bell size={20} style={{ cursor: 'pointer' }} />
                <img
                    className="profile-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Profile"
                />
            </div>
        </div>
    );
};

export default Navbar;
