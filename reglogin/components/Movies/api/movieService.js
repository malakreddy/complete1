const API_KEY = 'ae97db77';
const BASE_URL = 'http://www.omdbapi.com';

// Transform OMDb movie details to our app's format
const transformMovie = (movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    description: movie.Plot,
    poster: movie.Poster,
    backdrop: movie.Poster, // OMDb doesn't provide backdrops, using poster as fallback
    rating: movie.imdbRating,
    year: movie.Year,
    duration: movie.Runtime,
    genre: movie.Genre,
});

// Transform OMDb Search results
const transformSearchResult = (movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year,
});

export const getFeaturedMovie = async () => {
    try {
        // Fetching "Inception" as the featured movie
        const response = await fetch(`${BASE_URL}/?i=tt1375666&plot=full&apikey=${API_KEY}`);
        const data = await response.json();
        return transformMovie(data);
    } catch (error) {
        console.error("Error fetching featured movie:", error);
        return null;
    }
};

export const getTrendingMovies = async () => {
    try {
        // Simulating "Trending" by searching for a popular franchise format
        const response = await fetch(`${BASE_URL}/?s=Avengers&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        return data.Search ? data.Search.map(transformSearchResult) : [];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return [];
    }
};

export const getTopRatedMovies = async () => {
    try {
        // Simulating "Top Rated" with Star Wars
        const response = await fetch(`${BASE_URL}/?s=Star Wars&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        return data.Search ? data.Search.map(transformSearchResult) : [];
    } catch (error) {
        console.error("Error fetching top rated movies:", error);
        return [];
    }
};

export const getActionMovies = async () => {
    try {
        // Simulating "Action" with Fast and Furious
        const response = await fetch(`${BASE_URL}/?s=Fast and Furious&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        return data.Search ? data.Search.map(transformSearchResult) : [];
    } catch (error) {
        console.error("Error fetching action movies:", error);
        return [];
    }
};
