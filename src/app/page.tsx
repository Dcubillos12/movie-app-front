"use client";
import Banner from "@/components/Banner/Banner";
import FilterMovies from "@/components/FilterMovies/FilterMovies";
import SearchMovies from "@/components/SearchMovies/SearchMovies";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Film from "./types/film";
import { getGenerMovies, getMovies, getSearchMovies } from "./utils/api";
import CardMovies from "@/components/CardMovies/CardMovies";
import PaginationMovies from "@/components/PaginationMovies/PaginationMavies";
import Gener from "./types/gener";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASE_URL = "https://image.tmdb.org/t/p/";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POSTER_SIZE = "w220_and_h330_face";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POSTER_SIZE_BIG = "w1920_and_h800_face";

export default function Home() {
  const [movies, setMovies] = useState<Film[]>([]);
  const [genres, setGenres] = useState<Gener[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Film | null>(null);
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenerMovies();
      setGenres(genresData);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      let moviesData: Film[] = [];

      if (searchQuery) {
        moviesData = await getSearchMovies({ query: searchQuery });
      } else {
        moviesData = await getMovies({ page: currentPage });
      }
      console.log(moviesData);
      setMovies(moviesData);
      setSelectedMovie(moviesData[0] || null);
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (selectedGenre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
      setMovies(filteredMovies);
    }
  }, [selectedGenre, movies]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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

  const moviesByGenre = genres.map((genre) => ({
    genre,
    movies: movies.filter((movie) => movie.genre_ids.includes(genre.id)),
  }));

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
      <>
        <div className="col-12">
          {selectedMovie && (
            <Banner
              img={`${BASE_URL}${POSTER_SIZE_BIG}${selectedMovie.backdrop_path}`}
              description={selectedMovie.overview}
              title={selectedMovie.title}
              rating={selectedMovie.vote_average}
            />
          )}
        </div>
        <div className="col-sm-12 col-lg-2 bg-dark m-4">
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
        <div className="container col-sm-12 col-lg-9 mt-4">
          {moviesByGenre.length > 0 ? (
            moviesByGenre.map(({ genre, movies }) => (
              <div key={genre.id}>
                <h2 className="text-light">{genre.name}</h2>
                <Slider {...settings}>
                  {movies.length > 0 ? (
                    movies.map((movie) => (
                      <div key={movie.id} className="mb-4">
                        <Link href={`/movies/${movie.id}`}>
                          <CardMovies
                            img={`${BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                            title={movie.title}
                            date={movie.release_date.split("-")[0]}
                            rating={movie.vote_average}
                            id={movie.id}
                            onClick={() => {}}
                          />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No movies found for this genre.</p>
                  )}
                </Slider>
              </div>
            ))
          ) : (
            <p>No movies available.</p>
          )}
        </div>
        <PaginationMovies num={currentPage} onPageChange={handlePageChange} />{" "}
      </>
    </div>
  );
}
