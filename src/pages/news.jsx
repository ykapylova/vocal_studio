import { Banner } from "../components/Banner";

const newsList = [
  {
    title: "Поздравление с Днем матери!",
    date: "1 октября 2021",
    img: "pic.jpg",
  },
  {
    title: "Поздравление с Новым годом!",
    date: "31 декабря 2021",
    img: "pic.jpg",
  },
  {
    title: "Поздравление с Рождеством!",
    date: "6 января 2022",
    img: "pic.jpg",
  },
];

const NewsComponent = (props) => {
  return (
    <a className="card">
      <div className="image">
        <img src={"img/"+props.img} alt="" />
      </div>
      <div className="name">{props.title}</div>
      <div className="desc">{props.date}</div>
    </a>
  );
};

export const News = () => {
  return (
    <main>
      <Banner pageName={"Новости"} />
      <div className="wrapper wrapperNews">
        {newsList.map((news, key) => (
          <NewsComponent img={news.img} title={news.name} date={news.date} />
        ))}
      </div>
      <div></div>
    </main>
  );
};
