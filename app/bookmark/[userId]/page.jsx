"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/user";
import Loading from "@/app/components/Loading";
import { useBookmarkContext } from "@/app/context/bookmark";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import ReadMore from "@/app/components/ReadMore";
import styles from "app/styles/bookmarkPage.module.css";
import { AiOutlineDoubleRight } from "react-icons/ai";


const BookmarkPage = () => {
  const [bookmark, setBookmark] = useBookmarkContext();
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const { data } = useSession();
  const userId = data?.user?.id;

  useEffect(() => {
    async function fetchBookmark() {
      try {
        if (userId) {
          const response = await fetch(`/api/bookmark/${userId}`);
          const data = await response.json();
          setBookmark(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(`Error: bookmark error,`, error);
      }
    }
    fetchBookmark();
  }, [userId]);

  async function deleteBookmark(userId, itemId) {
    const response = await fetch(`/api/bookmark/${userId}/${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const newBookmarks = await bookmark.filter((item) => item._id !== itemId);
    setBookmark(newBookmarks);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.bookmarkPage}>
      <div className={styles.top}>
        <Link href={`/`}>Read Manga Online</Link>
        <span>
          <AiOutlineDoubleRight className={styles.doubleArrowIcon} />
        </span>
        <p>Bookmarks</p>
      </div>
      {(bookmark === []) | !bookmark ? (
        <p>"Bookmarks is empty"</p>
      ) : (
        bookmark &&
        bookmark.map((item) => (
          <div key={item._id} className={styles.item}>
            <Link href={`/mangas/${item.mangaId}`}>
              <Image
                src={item.imageUrl}
                alt={`Image of ${item.nameOfBookmark}`}
                height={90}
                width={61}
              />
            </Link>
            <div className={styles.itemText}>
              <Link href={`/mangas/${item.mangaId}`}>
                <h3>{item.nameOfBookmark}</h3>
              </Link>
              {/* <p>Current: <Link href={`/`}>Chapter 33</Link></p> */}
              <ReadMore
                synopsis={item.synopsis}
                bookmark={true}
                mangaId={item.mangaId}
              />
            </div>
            <div className={styles.btn}>
              <button onClick={() => deleteBookmark(userId, item._id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkPage;
