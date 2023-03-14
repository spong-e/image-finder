import { useEffect,useState } from "react";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_KEY ?? "",
});

const useUnsplash = (topic: string, page: number) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsSearching(true);
    unsplash.search
      .getPhotos({
        query: topic,
        page: page,
        perPage: 1,
      })
      .then((result) => {
        if (result.type === "success") {
          const photos = result.response;

          const {
            urls: { small },
          } = photos.results[0];

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
