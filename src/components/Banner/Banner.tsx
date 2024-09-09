import Image from "next/image";

function Banner({
  img,
  poster,
  title,
  rating,
  date,
}: {
  img: string;
  poster: string;
  title: string;
  rating: number;
  date: string;
}): JSX.Element {

  return (
    <div
      className="banner m-4 "
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "500px"
      }}
    >
      <div className="banner-content text-light">
        <h1>{title}</h1>
        <Image className="rounded border border-5 p-2" src={poster} alt="poster" width={200} height={300}  />
        <p>{date}</p>
        <p>⭐ {rating}</p>
      </div>
    </div>
  );
}

export default Banner;
