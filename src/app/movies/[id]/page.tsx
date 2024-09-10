import { getMovieById, getMovies } from "@/app/utils/api";
import type Film from "@/app/types/film";

const POSTER_SIZE_BIG = "w1920_and_h800_face";

export async function generateStaticParams() {
  const allMovies = await getMovies({ page: 1 });
  const totalPages = 25;

  for (let page = 2; page <= totalPages; page++) {
    const moviesOnPage = await getMovies({ page });
    allMovies.push(...moviesOnPage);
  }

  return allMovies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default async function MoviesPageId({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const movie: Film | null = await getMovieById(id);
  if (!movie) {
    return <div className="text-3xl">Movie not found</div>;
  }

  return (
    <div
      className="banner m-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/${POSTER_SIZE_BIG}${movie.backdrop_path})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "500px",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        color: "white",
        textAlign: "start",
        padding: "20px",
      }}
    >
      <div className="banner-content text-light mx-auto row">
        <div className="col-10">
          <h1 className="fs-1">{movie.title}</h1>
          <h4 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {movie.overview}
          </h4>
        </div>
      </div>
    </div>
  );
}
