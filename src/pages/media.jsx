import { Banner } from "../components/Banner";

export const Media = () => {
  const mediaList = [
    "https://www.youtube.com/embed/GM8N5wum-Jw",
    "https://www.youtube.com/embed/YWmeWtIF83E",
    "https://www.youtube.com/embed/CEY3XnHizAA",
    "https://www.youtube.com/embed/WNMZnKRCgQ4",
    "https://www.youtube.com/embed/QGOhNeNx_jg",
  ];

  return (
    <main>
      <Banner pageName={"Галерея"} imgSrc={"crystal-kids.JPG"}/>
      <div className="wrapper wrapperMedia">
        {mediaList.map((src, key) => (
          <a className="card" href="media1.html">
            <iframe
              width="560"
              height="315"
              src={src}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </a>
        ))}
      </div>
      <div></div>
    </main>
  );
};
