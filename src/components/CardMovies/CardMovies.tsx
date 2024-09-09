import Image from "next/image";

function CardMovies({
  img,
  title,
  date,
  rating,
  icon,
  id,
  onClick,
}: {
  img: string;
  title: string;
  date: string;
  rating: string;
  icon?: string;
  id: number;
  onClick: (id: number) => void;
}): JSX.Element {
  return (
    <>
      <div
        className="card bg-dark h-100"
        style={{ width: "95%" }}
        onClick={() => onClick(id)}
      >
          <img src={img} className="card-img-top" alt="..." />
        <div className="card-body text-light ">
          <h5>{title}</h5>
          <p>{date}</p>
          <p>{rating}</p>
          <a href="#" className="btn btn-primary">
            {icon}
          </a>
        </div>
      </div>
    </>
  );
}

export default CardMovies;
