// Импортируем необходимые модули и функции из библиотек
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Экспортируем компонент Chat
export const Chat = () => {
  // Используем useState для хранения списка постов
  const [postsList, setPostsList] = useState(null);
  // Получаем ссылку на коллекцию "posts" в базе данных Firestore
  const postsRef = collection(db, "posts");

  // Функция для получения постов из Firestore
  const getPosts = async () => {
    // Запрашиваем документы из коллекции "posts"
    const data = await getDocs(postsRef);
    // Обновляем состояние postsList данными из Firestore
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Используем хук useAuthState для получения данных о пользователе из Firebase Authentication
  const [user] = useAuthState(auth);
  // Получаем функцию для навигации между страницами с помощью хука useNavigate из react-router-dom
  // const navigate = useNavigate();

  // Схема для валидации данных в форме
  const schema = yup.object().shape({
    text: yup.string().required("Необходимо написать сообщение"),
  });

  // Используем хук useForm для управления формой и регистрации полей ввода
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  // Функция для обработки отправки формы и добавления нового поста в базу данных
  const onCreatePost = async (data) => {
    // Добавляем новый документ в коллекцию "posts" с данными из формы и информацией о пользователе
    // Получаем текущую дату и время
    const currentDate = new Date();

    // Определяем текущий день, месяц и год
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    const year = currentDate.getFullYear();

    // Определяем текущий час и минуту
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();

    // Форматируем строку времени
    const time =
      (day < 10 ? "0" : "") +
      day +
      "." +
      (month < 10 ? "0" : "") +
      month +
      "." +
      year +
      " " +
      (hour < 10 ? "0" : "") +
      hour +
      ":" +
      (minute < 10 ? "0" : "") +
      minute;

    await addDoc(postsRef, {
      ...data,
      userName: user?.displayName,
      userId: user?.uid,
      photoURL: user?.photoURL,
      time: time,
    });
    document.querySelector("textarea").value = "";
    getPosts();
  };

  // Используем хук useEffect для выполнения функции getPosts при загрузке компонента
  useEffect(() => {
    getPosts();
  }, []);

  // Возвращаем разметку компонента
  return (
    <main>
      {/* Комментированный код для компонента Banner, который не используется */}
      {/* <Banner pageName={"О студии"} imgSrc={"banner-crystal-jump.JPG"} /> */}
      <div></div>
      <div className="wrapper wrapperChat">
        {/* Отображаем список постов */}
        <div className="posts">
          {postsList?.reverse().map((post) => (
            <div className="post" key={post.id}>
              <div className="post-user-photo">
                <img src={post.photoURL} alt="" width={50} />
              </div>
              <div>
                {/* Выводим имя пользователя и текст поста */}
                <div className="username">{post.userName}</div>
                <div className="time">{post.time}</div>
                <div className="text">{post.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Форма для отправки нового поста */}
        <form onSubmit={handleSubmit(onCreatePost)}>
          <textarea placeholder="Напишите сообщение" {...register("text")} />
          <input type="submit" value="Отправить" />
        </form>
      </div>
      <div></div>
    </main>
  );
};
