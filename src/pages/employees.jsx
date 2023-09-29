import { Banner } from "../components/Banner";
import { TeamComponent } from "../components/TeamComponent";

export const Employee = () => {
  const teamList = [
    {
      title: "Реентович Кристина Николаевна",
      desc: 'Основатель и руководитель образцовой шоу-группы "Тип-топ" и эстрадной вокальной студии "Crystal"',
      img: "employee1.jpeg",
      link: "employee1.html",
    },
    {
      title: "Бельская Анна Анатольевна",
      desc: 'Руководитель образцовой шоу-группы "Тип-топ"',
      img: "employee2.png",
      link: "employee2.html",
    },
    {
      title: "Хореограф",
      desc: 'Хореограф образцовой шоу-группы "Тип-топ" и эстрадной вокальной студии "Crystal"',
      img: "employee3.jpeg",
      link: "employee3.html",
    },
  ];

  return (
    <main>
      <Banner pageName={"Наша команда"} />
      <div className="wrapper wrapperEmployees">
        {teamList.map((teamMember, key) => (
          <TeamComponent
            title={teamMember.title}
            desc={teamMember.desc}
            img={teamMember.img}
            link={teamMember.link}
          />
        ))}
      </div>
      <div></div>
    </main>
  );
};
