import { useEffect, useState, useRef } from "react";
import PageLayout from "../../layout/PageLayout/PageLayout";
import styles from "./Home.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getImages } from "../../features/images/api/GetImages/GetImages";

const Home = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(null);
  const observerRef = useRef(null);

  const {
    data: imagesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["images", search],
    queryFn: ({ pageParam = 1 }) => getImages(search, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.length > 0 ? lastPage.length + 1 : undefined),
  });

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    fetchNextPage({ pageParam: 1 });
  };

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <p>Loading...</p>;

  const allImages = imagesData?.pages?.flatMap((page) => page) || [];

  const sortedImages = [...allImages].sort((a, b) => {
    if (sortType === "likes") return b.likes - a.likes;
    if (sortType === "comments") return b.comments - a.comments;
    if (sortType === "views") return b.views - a.views;
    return 0;
  });

  return (
    <PageLayout>
      <div className={styles.wrapper}>
        {allImages.length > 0 && (
          <div className={styles.filters}>
            <button className={styles.filter__btn} onClick={() => handleSort("likes")}>
              Likes
            </button>
            <button className={styles.filter__btn} onClick={() => handleSort("comments")}>
              Comments
            </button>
            <button className={styles.filter__btn} onClick={() => handleSort("views")}>
              Views
            </button>
          </div>
        )}
        {allImages.length > 0 && (
          <div className={styles.gallery}>
            {sortedImages.map((item) => (
              <img key={item.id} className={styles.gallery__image} src={item.largeImageURL} alt={`${item.id}-${search}`} />
            ))}
          </div>
        )}
        <div className={styles.search}>
          <input type="text" className={styles.search__input} placeholder="Search images" value={search} onChange={handleInput} />
          <button className={styles.search__btn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div ref={observerRef}></div>
    </PageLayout>
  );
};

export default Home;