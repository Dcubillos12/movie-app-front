import { NextResponse } from 'next/server';
const API_KEY = process.env.API_KEY
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching movies' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.results || []);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}