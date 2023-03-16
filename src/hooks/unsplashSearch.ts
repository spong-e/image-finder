import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_KEY ?? "",
});

const unsplashSearch = {
  search: async (topic: string, page: number) => {
    return await unsplash.search.getPhotos({
      query: topic,
      page: page,
      perPage: 1,
    });
  },
};

export { unsplashSearch };
