import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase.ts";
import { collection, getDocs, query } from "firebase/firestore";

export const Post = (props) => {
  // Используем useState для хранения списка пользователей
  const [usersList, setUsersList] = useState(null);

  // Получаем ссылкv на коллекцию "users" в базе данных Firestore
  const usersRef = collection(db, "users");

  // Функция для получения списка пользователей из Firestore
  const getUsers = async () => {
    const querySnapshot = await getDocs(query(usersRef));
    // Обновляем состояние postsList данными из Firestore
    const users = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setUsersList(users);
  };

  // получаем временную метку
  const date = props.post?.time ? new Date(
    props.post.time.seconds * 1000 + props.post.time.nanoseconds / 1000000
  ) : null;

  // Проверяем, что date не является null, прежде чем пытаться читать его свойства
  const day = date ? String(date.getDate()).padStart(2, "0") : '';
  const month = date ? String(date.getMonth() + 1).padStart(2, "0") : '';
  const year = date ? date.getFullYear() : '';
  const hours = date ? String(date.getHours()).padStart(2, "0") : '';
  const minutes = date ? String(date.getMinutes()).padStart(2, "0") : '';

  const time = date ? `${day}.${month}.${year} ${hours}:${minutes}` : '';


  // Используем хук useEffect для выполнения функции getPosts при загрузке компонента
  useEffect(() => {
    getUsers();
  }, []);

  const photoURL = usersList?.find((userInfo) => userInfo.userId == props.post.userId).photoURL;;
  const displayName = usersList?.find((userInfo) => userInfo.userId == props.post.userId).displayName;;


  return (
    <div className="post">
      <div className="post-user-photo">
        <img src={photoURL} alt="" width={50} />
      </div>
      <div>
        <div className="username">{displayName}</div>
        <div className="time">{time}</div>
        <div className="text">{props.post.text}</div>
      </div>
    </div>
  );
};
