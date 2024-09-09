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

export default Film;
