import '../styles/MovieRow.css';

const MovieRow = ({ title, movies = [], isLargeRow = false }) => {
    return (
        <div className="row">
            <h2 className="row-title">{title}</h2>
            <div className="row-posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        src={movie.poster}
                        alt={movie.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieRow;
