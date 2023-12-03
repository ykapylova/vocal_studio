import { useEffect, useState } from "react";
import { groupsRef } from "../config/firebase.ts";
import { doc, onSnapshot, query, updateDoc } from "firebase/firestore";

export const AddConstantSchedule = () => {
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(groupsRef), (querySnapshot) => {
      const groups = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGroupsList(groups);
    });

    return () => unsubscribe();
  }, [groupsRef]);

  const createSchedule = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(doc(groupsRef, group), {
        [`schedule.Постоянные репетиции.${date}`]: time + " - " + place,
      });

      console.log(`Событие успешно добавлено`);
      window.location.reload(false);

    } catch (error) {
      console.error("Ошибка при добавлении события");
      console.log(error);
    }
  };

  const weekdays = {
    Понедельник: "ПН",
    Вторник: "ВТ",
    Среда: "СР",
    Четверг: "ЧТ",
    Пятница: "ПТ",
    Суббота: "СБ",
    Воскресенье: "ВС",
  };

  return (
    <form onSubmit={createSchedule} className="addConstantSchedule">
      <h2>Добавить постоянное <br /> расписание</h2>

      <div>Группа</div>
      <select
        className="group"
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
          return <option value={groupItem.id} key={index}>{groupItem.id}</option>;
        })}
      </select>

      <div>День недели</div>
      <select
        id="date"
        required
        onChange={(e) => setDate(e.target.value)}
        defaultValue={""}
      >
        <option value="" disabled>
          -- Не выбрано --
        </option>
        {Object.keys(weekdays).map((weekday, index) => {
          return (
            <option value={weekdays[weekday]} key={index}>
              {weekday}
            </option>
          );
        })}
      </select>

      <div>Время</div>
      <input
        type="time"
        required
        className="time"
        onChange={(e) => setTime(e.target.value)}
      />

      <div>Тип занятия</div>
      <select
        id="place"
        required
        onChange={(e) => setPlace(e.target.value)}
        defaultValue={""}
      >
        <option value="" disabled>
          -- Не выбрано --
        </option>
        <option value="Вокал">Вокал</option>;
        <option value="Хореография">Хореография</option>;
      </select>
      
      <button>Добавить расписание</button>
    </form>
  );
};
