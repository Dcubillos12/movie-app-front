function Banner({
  img,
  description,
  title,
  rating,
}: {
  img: string;
  description: string;
  title: string;
  rating: number;
}): JSX.Element {
  return (
    <div
      className="banner m-4 "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "500px",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        color: "white",
        textAlign: "start",
        padding: "20px",
      }}
    >
      <div className="banner-content text-light mx-auto row">
        <div className="col-10">
          <h1 className="fs-1">{title}</h1>
          <h4 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {description}
          </h4>
        </div>
        <div className="col-2"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: `conic-gradient(green ${
              (rating / 10) * 100
            }%, lightgray ${(rating / 10) * 100}% 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {`${Math.round((rating / 10) * 100)}%`}
        </div>
      </div>
    </div>
  );
}

export default Banner;
