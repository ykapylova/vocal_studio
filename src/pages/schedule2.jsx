import { getAuth } from "firebase/auth";
import { Banner } from "../components/Banner.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { groupsRef, usersRef } from "../config/firebase.ts";
import {
  getCurrentDateInfo,
  getDaysInMonth,
  getFirstDayOfMonth,
} from "../components/getDaysInMonth.js";
import { ScheduleMeaning } from "../components/ScheduleMeaning.jsx";

export const Schedule = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [group, setGroup] = useState("");

  useEffect(() => {
    const getGroup = async () => {
      if (user) {
        try {
          const querySnapshot = await getDocs(groupsRef);
          const groups = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const foundGroup = groups.find((group) =>
            group.names.includes(user.displayName)
          );
          if (foundGroup) {
            setGroup(foundGroup);
          } else {
            console.log("Группа не определена");
          }
        } catch (error) {
          console.error("Ошибка при получении данных пользователя:", error);
        }
      }
    };

    getGroup();
  }, [user, usersRef, groupsRef]);

  // генерация расписания

  const { year, month, today } = getCurrentDateInfo();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);

  const generateCalendar = () => {
    console.log("generateCalendar");
    const calendar = [];
    const weekdays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const weekdays2 = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

    if (!group) {
      return calendar;
    }

    const weekdaysForVocal = Object.keys(
      group.schedule["Постоянные репетиции"]
    ).sort();
    console.log(weekdaysForVocal);
    const weekdaysForVocalAdd = Object.keys(
      group.schedule["Дополнительные репетиции"]
    ).sort();
    const concerts = Object.keys(group.schedule["Концерты"]).sort();

    let i = 1000;

    weekdays.forEach((weekDay, index) => {
      calendar.push(
        <div key={index - 1000} align="center">
          {weekDay}
        </div>
      );
    });

    for (let day = 1; day < firstDayOfWeek; day++) {
      calendar.push(<div key={day - firstDayOfWeek}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(
        <div key={day - 1} className={day === today ? "date today" : "date"}>
          {day}
        </div>
      );
    }

    return calendar;

    // for (let day = 1; day <= daysInMonth; day++) {
    //   const weekDayIndex = day + firstDayOfWeek - 1;

    //   calendar.push(
    //     <div key={day - 1} className="day">
    //       <div className={day == today ? "date today" : "date"}>{day}</div>

    //       {weekdaysForVocal.includes(weekdays[weekDayIndex % 7]) && (
    //         <div className="constant-rehearsals">
    //           <div className="info">
    //             <div className="time">
    //               {group.schedule["Постоянные репетиции"][
    //                 weekdays2[(weekDayIndex - 1) % 7]
    //               ].slice(0, 5)}
    //             </div>
    //             <div className="infoBox">
    //               <div className="place">
    //                 {group.schedule["Постоянные репетиции"][
    //                   weekdays2[(weekDayIndex - 1) % 7]
    //                 ].slice(8)}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {weekdaysForVocalAdd.includes(`${day}-${month + 1}`) && (
    //         <div className="additional-rehearsals">
    //           <div className="info">
    //             <div className="time">
    //               {group.schedule["Дополнительные репетиции"][
    //                 `${day}-${month + 1}`
    //               ].slice(0, 5)}
    //             </div>
    //             <div className="infoBox">
    //               <div className="place">
    //                 {group.schedule["Дополнительные репетиции"][
    //                   `${day}-${month + 1}`
    //                 ].slice(8)}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {concerts.includes(`${day}-${month + 1}`) && (
    //         <div className="concerts">
    //           <div className="info">
    //             <div className="time">
    //               {group.schedule["Концерты"][`${day}-${month + 1}`].slice(
    //                 0,
    //                 5
    //               )}
    //             </div>
    //             <div className="infoBox">
    //               <div className="place">
    //                 {group.schedule["Концерты"][`${day}-${month + 1}`].slice(8)}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   );
    // }

    return calendar;
  };

  const fillInCalendar = (calendar) => {
    console.log("fillInCalendar");
    const weekdays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    let allEvents = [];
    const rehearsalTypes = {
      "Постоянные репетиции": "constant-rehearsals",
      "Дополнительные репетиции": "additional-rehearsals",
      Концерты: "concerts",
    };
    const rehearsalTypesReversed = {
      "constant-rehearsals": "Постоянные репетиции",
      "additional-rehearsals": "Дополнительные репетиции",
      concerts: "Концерты",
    };

    Object.keys(rehearsalTypes).forEach((rehearsalType) => {
      console.log(group);
      Object.keys(group.schedule["Постоянные репетиции"]);
      console.log(group.schedule);
      Object.keys(group.schedule[rehearsalType]).forEach((dayWeek) => {
        let item = group.schedule[rehearsalType][dayWeek];
        let type = rehearsalTypes[rehearsalType];

        allEvents.push([
          item.slice(0, 5),
          item.slice(8),
          group.id,
          type,
          dayWeek,
        ]);
      });
    });
    allEvents = allEvents.sort();

    let newCalendar = calendar.map((dayElement, index) => {
      const weekDayIndex = (index + 1) % 7;

      return (
        <div
          key={dayElement.key}
          className={dayElement.key < 0 ? "empty" : "day"}
        >
          {dayElement}

          {allEvents.map((item, index) => {
            if (+dayElement.key >= 0) {
              if (
                ((item[4].slice(0, 2) === String(+dayElement.key + 1) ||
                  item[4].slice(0, 2) === "0" + String(+dayElement.key + 1)) &&
                  month + 1 === Number(item[4].slice(3, 5))) ||
                weekdays[weekDayIndex] === item[4].slice(0, 2)
              ) {
                return (
                  <div className={item[3]} key={index}>
                    <div className="info">
                      <div className="time">{item[0]}</div>
                      <div className="infoBox">
                        <div className="group"> {item[2]}</div>
                        <div className="place">{item[1]}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      );
    });

    return newCalendar;
  };

  return (
    <main>
      <h1>Расписание</h1>
      {/* <Banner pageName={"Расписание"} imgSrc={"banner-crystal-jump.JPG"} /> */}
      <div className="wrapper wrapperSchedule">
        <ScheduleMeaning />
        <div className="calendar-grid">
          {group && fillInCalendar(generateCalendar())}
        </div>
      </div>
      <div></div>
    </main>
  );
};
