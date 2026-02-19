import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import { getFeaturedMovie, getTrendingMovies, getTopRatedMovies, getActionMovies } from '../api/movieService';

const LandingPage = () => {
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const featured = await getFeaturedMovie();
            setFeaturedMovie(featured);

            const trending = await getTrendingMovies();
            setTrendingMovies(trending);

            const topRated = await getTopRatedMovies();
            setTopRatedMovies(topRated);

            const action = await getActionMovies();
            setActionMovies(action);
        };

        fetchData();
    }, []);

    return (
        <div className="landing-page">
            <Navbar />
            <Hero movie={featuredMovie} />
            <div style={{ marginTop: '-10vh', position: 'relative', zIndex: 10 }}>
                <MovieRow title="Trending Now" movies={trendingMovies} />
                <MovieRow title="Top Rated" movies={topRatedMovies} />
                <MovieRow title="Action Thillers" movies={actionMovies} />
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
