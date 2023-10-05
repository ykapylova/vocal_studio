import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase.ts";
import { useEffect } from "react";

export const CreatePostForm = () => {
  // Используем хук useAuthState для получения данных о пользователе из Firebase Authentication
  const [user] = useAuthState(auth);

  // Получаем ссылкv на коллекцию "posts" в базе данных Firestore
  const postsRef = collection(db, "posts");


  // Схема для валидации данных в форме
  const schema = yup.object().shape({
    text: yup.string().required("Необходимо написать сообщение"),
  });

  // Используем хук useForm для управления формой и регистрации полей ввода
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleSubmit(onCreatePost)()
  }

  // Функция для обработки отправки формы и добавления нового поста в базу данных
  const onCreatePost = async (data) => {
    // Добавляем новый документ в коллекцию "posts" с данными из формы и информацией о пользователе

    await addDoc(postsRef, {
      ...data,
      userId: user?.uid,
      time: serverTimestamp(),
    });
    document.querySelector("textarea").value = "";
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <textarea placeholder="Напишите сообщение" {...register("text")} />
      <input type="submit" value="Отправить" />
    </form>
  );
};
