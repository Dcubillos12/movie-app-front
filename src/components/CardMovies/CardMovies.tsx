import Image from "next/image";
import styles from "@/components/CardMovies/styles.module.css";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function CardMovies({
  img,
  title,
  date,
  rating,
  id,
  onClick,
}: {
  img: string;
  title: string;
  date: string;
  rating: number;
  id: number;
  onClick: (id: number) => void;
}): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  const pathColor = rating < 5 ? "red" : "#07a20f";
  return (
    <div
      className={`${styles.cardheigth} card bg-dark`}
      style={{ width: "95%" }}
      onClick={() => onClick(id)}
    >
      <div className="d-flex justify-content-center">
        <Image
          className="rounded border border-5 p-2 "
          src={img}
          alt="poster"
          width={200}
          height={300}
        />
      </div>
      <div className="card-body text-light">
        <h6>{title}</h6>
        <p>{date}</p>
        <div className="row g-0 m-2">
          <div className="col-6">
            <label className="text-light fs-6 mb-2">Rating</label>
            <div style={{ width: 40, height: 40 }}>
              <CircularProgressbar
                value={rating * 10}
                text={`${rating}%`}
                styles={buildStyles({
                  pathColor: pathColor,
                })}
              />
            </div>
          </div>
          <div className="col-6 text-center">
            <label className="text-light fs-6">Favorites</label>
            <span
              className={`fs-2 ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}
              onClick={handleFavoriteClick}
              style={{ cursor: "pointer" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMovies;
