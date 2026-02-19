import { Play, Plus } from 'lucide-react';
import '../styles/Hero.css';

const Hero = ({ movie }) => {
    if (!movie) return <div className="hero-loading"></div>;

    return (
        <header
            className="hero"
            style={{
                backgroundImage: `url('${movie.backdrop || movie.poster}')`
            }}
        >
            <div className="hero-content">
                <h1 className="hero-title">{movie.title}</h1>
                <p className="hero-description">{movie.description}</p>
                <div className="hero-buttons">
                    <button className="hero-btn play-btn">
                        <Play fill="black" size={20} /> Play
                    </button>
                    <button className="hero-btn list-btn">
                        <Plus size={20} /> My List
                    </button>
                </div>
            </div>
            <div className="hero-fade-bottom" />
        </header>
    );
};

export default Hero;
