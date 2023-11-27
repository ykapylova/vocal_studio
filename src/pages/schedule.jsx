import { getAuth } from "firebase/auth";
import { Banner } from "../components/Banner";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getDocs} from "firebase/firestore";
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
    const calendar = [];
    const weekdays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const weekdays2 = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

    if (!group) {
      return calendar;
    }

    const weekdaysForVocal = Object.keys(
      group.schedule["Постоянные репетиции"]
    ).sort();
    const weekdaysForVocalAdd = Object.keys(
      group.schedule["Дополнительные репетиции"]
    ).sort();
    const concerts = Object.keys(group.schedule["Концерты"]).sort();

    let i = 1000;

    weekdays2.forEach((weekDay) => {
      calendar.push(
        <div key={i++} align="center">
          {weekDay}
        </div>
      );
    });

    for (let day = 1; day < firstDayOfWeek; day++) {
      calendar.push(<div key={day - firstDayOfWeek}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const weekDayIndex = day + firstDayOfWeek - 1;

      calendar.push(
        <div key={day - 1} className="day">
          <div className={day == today ? "date today" : "date"}>{day}</div>

          {weekdaysForVocal.includes(weekdays[weekDayIndex % 7]) && (
            <div className="constant-rehearsals">
              <div
                className="time"
                data-tooltip={group.schedule["Постоянные репетиции"][
                  weekdays2[(weekDayIndex - 1) % 7]
                ].slice(8)}
              >
                {group.schedule["Постоянные репетиции"][
                  weekdays2[(weekDayIndex - 1) % 7]
                ].slice(0, 5)}
              </div>
            </div>
          )}

          {weekdaysForVocalAdd.includes(`${day}.${month + 1}`) && (
            <div className="additional-rehearsals">
              <div
                className="time"
                data-tooltip={group.schedule["Дополнительные репетиции"][
                  `${day}.${month + 1}`
                ].slice(8)}
              >
                {group.schedule["Дополнительные репетиции"][
                  `${day}.${month + 1}`
                ].slice(0, 5)}
              </div>
            </div>
          )}

          {concerts.includes(`${day}.${month + 1}`) && (
            <div className="concerts">
              <div
                className="time"
                data-tooltip={group.schedule["Концерты"][
                  `${day}.${month + 1}`
                ].slice(8)}
              >
                {group.schedule["Концерты"][`${day}.${month + 1}`].slice(0, 5)}
              </div>
            </div>
          )}
        </div>
      );
    }

    return calendar;
  };

  return (
    <main>
      <Banner pageName={"Расписание"} imgSrc={"banner-crystal-jump.JPG"} />
      <div className="wrapper wrapperSchedule">
        <ScheduleMeaning />
        <div className="calendar-grid">{generateCalendar()}</div>
      </div>
      <div></div>
    </main>
  );
};
