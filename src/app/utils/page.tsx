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

export { getMovies, getSearchMovies, getGenerMovies };
