import { useAuthState } from "react-firebase-hooks/auth";
import { createElement, useEffect, useState } from "react";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, groupsRef, usersRef } from "../config/firebase.ts";
import {
  getCurrentDateInfo,
  getDaysInMonth,
  getFirstDayOfMonth,
} from "./getDaysInMonth.js";
import { CheckBeforeDeleteWindow } from "./CheckBeforeDeleteWindow.jsx";

export const AllGroupsSchedule = () => {
  let [user] = useAuthState(auth);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const querySnapshot = await getDocs(groupsRef);
        const groups = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setGroups(groups);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };
    getGroups();
  }, [user, usersRef, groupsRef]);

  // генерация расписания

  const { year, month, today } = getCurrentDateInfo();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfMonth(year, month);

  const generateCalendar = () => {
    const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

    let calendar = [];
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
  };

  const fillInCalendar = (calendar) => {
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
    groups.forEach((group) => {
      Object.keys(rehearsalTypes).forEach((rehearsalType) => {
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
    });
    allEvents = allEvents.sort();

    let newCalendar = calendar.map((dayElement, index) => {
      const weekDayIndex = (index + 1) % 7;

      return (
        <div key={dayElement.key} className="day">
          {dayElement}

          {allEvents.map((item, index) => {
            if (+dayElement.key >= 0) {
              if (
                ((item[4].slice(0, 2) === String(+dayElement.key + 1) ||
                  item[4].slice(0, 2) === "0" + String(+dayElement.key + 1)) &&
                  month + 1 === Number(item[4].slice(3, 5))) ||
                weekdays[weekDayIndex] === item[4]
              ) {

                let infoAfter = document.createElement("div");

                const infoBox = (event) => {
                  try {
                    const rect =
                      event.target.className == "info"
                        ? event.target.getBoundingClientRect()
                        : event.target.parentNode.getBoundingClientRect();

                    infoAfter.innerHTML = item[1];

                    const calenderGrid = document
                      .querySelector(".calendar-grid")
                      .getBoundingClientRect();
                    console.log(calenderGrid.width);

                    infoAfter.style.position = "absolute";
                    infoAfter.style.opacity = "0";
                    infoAfter.style.width = calenderGrid.width / 7 - 10 + "px";
                    infoAfter.style.display = "block";
                    document.body.appendChild(infoAfter);
                    infoAfter.classList.add("info-after");

                    const infoAfterElem = document
                      .querySelector(".info-after")
                      .getBoundingClientRect();

                    infoAfter.style.top =
                      rect.top - infoAfterElem.height - 3 + "px";
                    infoAfter.style.left = rect.left + "px";
                  } catch (err) {
                    console.log();
                  }

                  // Показываем элемент
                };

                const infoBoxRemove = () => {
                  if (infoAfter) {
                    try {
                      document.body.removeChild(infoAfter);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                };

                return (
                  <div className={item[3]} key={index}>
                    <div
                      className="info"
                      // data-tooltip={item[1]}
                      onMouseOver={infoBox}
                      onMouseLeave={infoBoxRemove}
                    >
                      <span className="time">{item[0]}</span>{" "}
                      <span className="group">{item[2]}</span>
                      <input
                        type="button"
                        value="❌"
                        onClick={() =>
                          checkBeforeDelete(
                            item[2],
                            rehearsalTypesReversed[item[3]],
                            item[4],
                            item[0]
                          )
                        }
                      />
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

  const checkBeforeDelete = (groupName, type, date, time) => {
    let typeText;
    switch (type) {
      case 'Концерты':
        typeText = "концерт";
        break;
      case 'Постоянные репетиции':
        typeText = "постоянные репетиции";
        break;
      case 'Дополнительные репетиции':
        typeText = "дополнительную репетицию";
        break;
    }
    let checkWindow = document.createElement("div");
    checkWindow.classList.add("check-window");
    checkWindow.innerHTML = `<div>Вы точно хотите удалить ${typeText}: <br>${date.slice(0,3)+date.slice(3,5)} в ${time} для ${groupName}?</div>
                             <div class="no-yes-container">
                               <div class="no">❌</div>
                               <div class="yes">✅</div>
                             </div>`;

    document.body.appendChild(checkWindow);

    document.querySelector(".no").addEventListener("click", () => {
      document.body.removeChild(checkWindow);
    });

    document.querySelector(".yes").addEventListener("click", () => {
      document.body.removeChild(checkWindow);
      deleteEvent(groupName, type, date);
    });
  };

  const deleteEvent = async (groupName, type, date) => {
    try {
      const foundGroup = groups.find((group) => group.id == groupName);
      let schedule = foundGroup["schedule"][type];
      delete schedule[date];
      console.log(schedule);

      await updateDoc(doc(groupsRef, groupName), {
        [`schedule.${type}`]: schedule,
      });
      window.location.reload(false);

      console.log("Событие успешно удалено");
    } catch (err) {
      console.log("Событие не удалось удалить");
      console.log(err);
    }
  };

  return (
    <div className="calendar-grid">{fillInCalendar(generateCalendar())}</div>
  );
};
