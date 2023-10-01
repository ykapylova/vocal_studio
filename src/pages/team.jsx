import { Banner } from "../components/Banner";

const teamList = [
  {
    title: "Реентович Кристина Николаевна",
    desc: 'Основатель и руководитель образцовой шоу-группы "Тип-топ" и эстрадной вокальной студии "Crystal"',
    img: "team1.jpeg",
    link: "team1.html",
  },
  {
    title: "Бельская Анна Анатольевна",
    desc: 'Руководитель образцовой шоу-группы "Тип-топ"',
    img: "team2.png",
    link: "team2.html",
  },
  {
    title: "Хореограф",
    desc: 'Хореограф образцовой шоу-группы "Тип-топ" и эстрадной вокальной студии "Crystal"',
    img: "team3.jpeg",
    link: "team3.html",
  },
];

const TeamComponent = (props) => {
  return (
    <a className="card" href={props.link}>
      <div className="image">
        <img src={"img/team/" + props.img} alt="" />
      </div>
      <div className="name">{props.title}</div>
      <div className="desc">{props.desc}</div>
    </a>
  );
};

export const Team = () => {
  return (
    <main>
      <Banner pageName={"Наша команда"} imgSrc={"banner-crystal-kids.jpeg"} />
      <div className="wrapper wrapperTeam">
        {teamList.map((teamMember, key) => (
          <TeamComponent
            title={teamMember.title}
            desc={teamMember.desc}
            img={teamMember.img}
            // link={teamMember.link}
          />
        ))}
      </div>
      <div></div>
    </main>
  );
};
