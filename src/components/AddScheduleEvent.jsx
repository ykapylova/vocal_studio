import { useEffect, useState } from "react";
import { groupsRef } from "../config/firebase.ts";
import { doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";

export const AddScheduleEvent = () => {
  const [place, setPlace] = useState("");
  // const [note, setNote] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");

  const [groupsList, setGroupsList] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(groupsRef), (querySnapshot) => {
      const groups = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGroupsList(groups);
    });

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

    return () => unsubscribe();
  }, [groupsRef, date]);

  const createEvent = async (groupName, newDate) => {
    try {
      const foundGroup = groups.find((group) => group.id == groupName);
      if (!foundGroup["schedule"][type][newDate]) {
        await updateDoc(doc(groupsRef, groupName), {
          [`schedule.${type}.${newDate}`]: time + " - " + place,
        });
        console.log(`Событие успешно добавлено`);
        console.log(foundGroup["schedule"][type]);

        const updatedGroups = groups.map((group) =>
          group.id === groupName
            ? {
                ...group,
                schedule: {
                  ...group.schedule,
                  [type]: {
                    ...group.schedule[type],
                    [newDate]: time + " - " + place,
                  },
                },
              }
            : group
        );
        setGroups(updatedGroups);
        window.location.reload(false);
      } else {
        console.log("Событие" + date + "уже есть");

        const newNewDate = newDate + "_";
        createEvent(group, newNewDate);
      }
    } catch (error) {
      console.error("Ошибка при добавлении события");
      console.log(error);
    }
  };

  const onCreateEvent = (event) => {
    event.preventDefault();
    if (group == "Все") {
      groupsList.map(async (groupItem) => {
        await createEvent(groupItem.id, date);
      });
    } else {
      createEvent(group, date);
    }
  };

  return (
    <form onSubmit={onCreateEvent} className="addScheduleEvent">
      <h2>Добавить событие</h2>

      <div>Тип события</div>
      <select
        name="type"
        id="type"
        required
        onChange={(e) => setType(e.target.value)}
        defaultValue={""}
      >
        <option value="" disabled>
          -- Не выбрано --
        </option>
        <option value="Дополнительные репетиции">Репетиция</option>
        <option value="Концерты">Концерт</option>
      </select>

      <div>Группа</div>
      <select
        name="group"
        id="group"
        required
        onChange={(e) => {
          return setGroup(e.target.value);
        }}
        defaultValue={""}
      >
        <option value="" disabled>
          -- Не выбрано --
        </option>
        {groupsList.map((groupItem, index) => {
          return (
            <option value={groupItem.id} key={index}>
              {groupItem.id}
            </option>
          );
        })}
        <option value="Все">Все</option>
      </select>

      <div>Дата</div>
      <input
        type="date"
        required
        className="date"
        onChange={(e) =>
          setDate(e.target.value.slice(8) + "-" + e.target.value.slice(5, 7))
        }
      />

      <div>Время</div>
      <input
        type="time"
        required
        className="time"
        onChange={(e) => setTime(e.target.value)}
      />

      <div>Место</div>
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
        className="place"
      />

      {/* <div>Заметка</div>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="note"
      /> */}

      <br />
      <button>Добавить cобытие</button>
    </form>
  );
};
