import { ResultType } from "@remix-run/router/dist/utils";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Button, TextField, Radio, RadioGroup } from "@mui/material";
import { isReturnStatement } from "typescript";
import { createApi } from "unsplash-js";
import { useDetails, useDetailsActions } from "../providers";

const unsplash = createApi({
  accessKey: "wgjrDO2DM4AvZsuTYlTWp8tCAtmwz2n0P3rCN0cNHho ",
});

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const details = useDetails();
  const { set } = useDetailsActions();
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<string[]>([]);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    if (details.thumbnail) {
      setPreview(details.thumbnail);
      return;
    }
    unsplash.search
      .getPhotos({
        query: details.topic,
        page: 1,
        perPage: 10,
        color: "green",
        orientation: "portrait",
      })
      .then((result) => {
        if (result.type === "success") {
          const photos = result.response;

          photos.results.forEach((photo) => {
            const {
              urls: { small },
            } = photo;
            setImages((existingPhotos: string[]) => [...existingPhotos, small]);
          });

          const {
            urls: { small },
          } = photos.results[0];
          setPreview(small);
        }
      });
  }, [details]);

  useEffect(() => {
    //if (preview) return;
    if (details.thumbnail) return;
    setPreview(images[position]);
  }, [position]);

  const decline = () => setPosition(position + 1);

  const accept = () => {
    if (!preview) return;
    const newDetails: Details = { ...details, thumbnail: preview };
    set(newDetails);
  };
  return (
    <>
      <p>Preview</p>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => accept()}
      >
        Accept
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => decline()}
      >
        Decline
      </Button>
      {preview && <img src={preview} />}
    </>
  );
};

export default Search;
