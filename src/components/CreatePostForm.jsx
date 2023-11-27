import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, postsRef } from "../config/firebase.ts";

export const CreatePostForm = () => {
  const [user] = useAuthState(auth);

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

  const onCreatePost = async (data) => {

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
