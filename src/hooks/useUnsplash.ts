import { useEffect, useState } from "react";

import { unsplashSearch } from "./unsplashSearch";

const useUnsplash = (topic: string, page: number) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsSearching(true);
    setPhoto(null);

    unsplashSearch
      .search(topic, page)
      .then((result) => {
        if (result.type === "success") {
          const photos = result.response;

          const {
            urls: { small },
          } = photos.results[0];

          setIsSearching(false);
          setPhoto(small);
        }
      })
      .catch(() => {
        setIsSearching(false);
        setIsError(true);
        setPhoto(null);
      });

    return () => {};
  }, [page, topic]);

  return [isSearching, photo, isError] as const;
};

export default useUnsplash;
