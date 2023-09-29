import { Banner } from "../components/Banner";

export const News = () => {
  const newsList = [
    { name: "Поздравление с Днем матери!", date: "1 октября 2021" },
    { name: "Поздравление с Новым годом!", date: "31 декабря 2021" },
    { name: "Поздравление с Рождеством!", date: "6 января 2022" },
  ];

  return (
    <main>
      <Banner pageName={"Новости"} />
      <div className="wrapper wrapperNews">
        {newsList.map((news, key) => (
          <a className="card" href="news1.html">
            <img src="news-pic.jpg" alt="" />
            <div className="name">{news.name}</div>
            <div className="date">{news.date}</div>
          </a>
        ))}
      </div>
      <div></div>
    </main>
  );
};
