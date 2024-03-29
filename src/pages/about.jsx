import { Banner } from "../components/Banner";

const list = [
  {
    text: 'Добро пожаловать в образцовую студию вокала "Кристалл"! Мы - место, где рождается настоящее музыкальное волшебство и талант расцветает. Наша студия существует с 2010 года и является домом для двух уникальных коллективов: шоу-группы "Тип-топ" и конкурсного состава. Давайте расскажем вам о нашем уникальном мире музыки и искусства.',
    images: ["about2.jpeg", "about3.jpeg"],
  },
  {
    text: '🎶 Шоу-группа "Тип-топ" - это звезды, зажигающие нашу сцену с 2004 года. Мы собрали более 40 талантливых детей и молодых артистов, чей возраст варьируется от 4 до 21 года. Они обучаются сценическому мастерству, вокалу, хореографии и музыкальной грамоте. Наши маленькие звезды не просто выступают, они создают настоящее шоу!',
    images: ["tip-top.jpeg", "crystal-kids.JPG"],
  },
  {
    text: '🌟 Конкурсный состав - это наши молодые претенденты на музыкальные вершины. Они тоже учатся в студии "Кристалл" и могут соревноваться с лучшими. Вместе с нами, они развивают вокальные таланты и радуют нас своими выступлениями.',
    images: ["crystal2.jpeg", "crystal2.JPG"],
  },
  {
    text: "👩‍🏫 Наши педагоги - профессионалы своего дела. У нас вы найдете опытных преподавателей с высшими образованиями в области педагогики и вокала. Они индивидуально работают с каждым учеником, помогая раскрыть его потенциал.",
    images: ["team1.jpeg", "team2.jpeg"],
  },
  {
    text: " 🎤 Наши воспитанники изучают сценическое мастерство, занимаются вокалом, хореографией и музыкальной грамотой. Наши достижения - это выступления на лучших концертных площадках города, области и даже Республики! Мы также активно участвуем в проектах, фестивалях и конкурсах, где доказываем свое мастерство и приносим радость публике.",
    images: ["masha-mic.jpeg", "ulya.jpeg"],
  },
];

const AboutItem = (props) => {
  return (
    <div className="about-item">
      <div className="text">{props.text}</div>
      <div className="img-container">
        {props.images.map((image, key) => {
          return <img src={"img/about/"+image} alt="" />;
        })}
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <main>
      <Banner pageName={"О студии"} imgSrc={"banner-crystal-jump.JPG"} />
      <div className="wrapper wrapperAbout">
        {list.map((item, key) => {
          return <AboutItem text={item.text} images={item.images} />;
        })}
      </div>
      <div></div>
    </main>
  );
};
