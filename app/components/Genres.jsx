"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Genres = () => {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/genres/manga`);
      const data = await response.json();
      console.log("genres", data);
      setLoading(false);
      setGenres(data.data);
    }
    fetchGenres();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>Manga by Genre</h2>
      <div>
        <ul>
          
          <Link href={`/order_by/start_date/1/sort/desc`}>
            <li>Newest</li>
          </Link>
          <Link href={`/order_by/rank/1`}>
            <li>Popular</li>
          </Link>
        </ul>
      </div>

      <div>
      <ul>
          <Link href={`/order_by/popularity/1`}>
            <li>All</li>
          </Link>
          <Link href={`/order_by/start_date/1/sort/desc`}>
            <li>Ongoing</li>
          </Link>

          <Link href={`/order_by/start_date/1/sort/desc`}>
            <li>Completed</li>
          </Link>
        </ul>
      </div>

      <div>
        <Link href={`/allManga/1`}>
          <li>All</li>
        </Link>

        {genres &&
          genres.map((genre) => (
            <ul key={genre.mal_id}>
              <Link href={`/genre/${genre.name}/1?genreId=${genre.mal_id}`}>
                <li>{genre.name} </li>
              </Link>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Genres;
