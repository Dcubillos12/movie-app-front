"use client";
import Banner from "@/components/Banner/Banner";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Slider } from 'react-slick';


interface Film {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  media_type: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[]; // Añadir esta línea
}
interface Gener {
  id: number;
  name: string;
}

const BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w220_and_h330_face";
const POSTER_SIZE_BIG = "w1920_and_h800_face";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTA1MjY2MDcwNmVkNWQ2ZGIxNDFkMTUyMDM4MmIzMSIsIm5iZiI6MTcyNTY0MzA4OS4zNjQwNzcsInN1YiI6IjY2ZDliY2QyZDdjMTllYTg2NmI4ZDMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GDEPgsoDjRw0lQ-30qDec0ZS7_E_s946eW1yq3wwouo";

async function getMovies({ page }: { page: number }): Promise<Film[]> {
  if (!API_KEY) {
    console.error("API key is missing");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
async function getSearchMovies({ query }: { query: string }): Promise<Film[]> {
  if (!API_KEY) {
    console.error("API key is missing");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
async function getGenerMovies(): Promise<Gener[]> {
  if (!API_KEY) {
    console.error("API key is missing");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.genres || []; // Retorna la lista de géneros
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}
const PaginationMovies = ({
  num,
  onPageChange,
}: {
  num: number;
  onPageChange: (newPage: number) => void;
}): JSX.Element => {
  const handlePrevious = () => {
    if (num > 1) {
      onPageChange(num - 1);
    }
  };

  const handleNext = () => {
    onPageChange(num + 1);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${num === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePrevious}
            disabled={num === 1}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <span className="page-link">{num}</span>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
function CardMovies({
  img,
  title,
  date,
  rating,
  icon,
  id,
  onClick,
}: {
  img: string;
  title: string;
  date: string;
  rating: string;
  icon?: string;
  id: number;
  onClick: (id: number) => void;
}): JSX.Element {
  return (
    <>
      <div
        className="card bg-dark h-100"
        style={{ width: "95%" }}
        onClick={() => onClick(id)}
      >
        <Image src={img} alt="logo" width={50} height={50} />
        <div className="card-body text-light ">
          <h5>{title}</h5>
          <p>{date}</p>
          <p>{rating}</p>
          <a href="#" className="btn btn-primary">
            {icon}
          </a>
        </div>
      </div>
    </>
  );
}
function SearchMovies({
  title,
  icon,
  placeholder,
  onChange,
  onClick,
}: {
  title: string;
  icon: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}): JSX.Element {
  return (
    <>
      <div>
        <h1 className="text-light fs-4">{title}</h1>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
          />
          <button
            onClick={onClick}
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            {icon}
          </button>
        </div>
      </div>
    </>
  );
}
function FilterMovies({
  title,
  genres,
  onGenreSelect,
}: {
  title: string;
  genres: Gener[];
  onGenreSelect: (genreId: number) => void;
}): JSX.Element {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenreId = parseInt(event.target.value);
    onGenreSelect(selectedGenreId);
  };

  return (
    <>
      <h1 className="text-light fs-4">{title}</h1>
      <div className="input-group mb-3">
        <select
          className="form-select"
          id="inputGroupSelect01"
          onChange={handleSelectChange}
        >
          <option value="0" selected>
            Choose...
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
function MoviesPage(): JSX.Element {
  const [movies, setMovies] = useState<Film[]>([]);
  const [genres, setGenres] = useState<Gener[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Film | null>(null);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenerMovies();
      setGenres(genresData);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let moviesData: Film[] = [];

      if (searchQuery) {
        moviesData = await getSearchMovies({ query: searchQuery });
      } else {
        moviesData = await getMovies({ page: currentPage });
      }
      setMovies(moviesData);
      setSelectedMovie(moviesData[0] || null);
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleMovieSelect = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) {
      setSelectedMovie(movie);
    }
  };
  const handleSearch = () => {
    if (search.trim() === "") {
      setSearchQuery("");
    } else {
      setSearchQuery(search);
    }
  };
  const handleGenreChange = (genreId: number) => {
    setSelectedGenre(genreId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const moviesByGenre = genres.map((genre) => ({
    genre,
    movies: movies.filter((movie) => movie.genre_ids.includes(genre.id)),
  }));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Número de películas visibles a la vez
    slidesToScroll: 1,
    arrows: false, // Desactiva las flechas de navegación
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="row">
      <div className="col-12">
        {selectedMovie && (
          <Banner
            img={`${BASE_URL}${POSTER_SIZE_BIG}${selectedMovie.backdrop_path}`}
            poster={`${BASE_URL}${POSTER_SIZE}${selectedMovie.poster_path}`}
            title={selectedMovie.title}
            rating={selectedMovie.vote_average}
            date={selectedMovie.release_date}
          />
        )}
      </div>
      <div className="col-sm-12 col-lg-2 bg-dark">
        <SearchMovies
          title="Search"
          icon="🔎"
          placeholder="Search..."
          onChange={handleChange}
          onClick={handleSearch}
        />
        <FilterMovies
          title="Genres"
          genres={genres}
          onGenreSelect={handleGenreChange}
        />
      </div>
      <div className="container col-sm-12 col-lg-10 mt-4">
        {moviesByGenre.map(({ genre, movies }) => (
          <div key={genre.id}>
            <h2 className="text-light">{genre.name}</h2>
            <Slider {...settings}>
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div key={movie.id} className="mb-4">
                    <CardMovies
                      img={`${BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                      title={movie.title}
                      date={movie.release_date.split("-")[0]}
                      rating={movie.vote_average.toString()}
                      icon="⭐️"
                      id={movie.id}
                      onClick={() => handleMovieSelect(movie.id)}
                    />
                  </div>
                ))
              ) : (
                <p>No movies found for this genre.</p>
              )}
            </Slider>
          </div>
        ))}
      </div>
      <PaginationMovies num={currentPage} onPageChange={handlePageChange} />{" "}
    </div>
  );
}

export default MoviesPage;
