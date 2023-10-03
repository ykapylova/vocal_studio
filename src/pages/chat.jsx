import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "./../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { CreatePostForm } from "../components/CreatePostForm.jsx";
import { Post } from "../components/Post.jsx";

export const Chat = () => {
  // Используем useState для хранения списков постов и пользователей
  const [postsList, setPostsList] = useState(null);

  // Получаем ссылкv на коллекцию "posts" в базе данных Firestore
  const postsRef = collection(db, "posts");

  // Используем хук useAuthState для получения данных о пользователе из Firebase Authentication
  const [user] = useAuthState(auth);

  // Функция для получения постов из Firestore
  const getPosts = async () => {
    const querySnapshot = await getDocs(query(postsRef, orderBy("time")));
    const posts = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setPostsList(posts);
  };

  // Используем хук useEffect для выполнения функции getPosts при загрузке компонента
  useEffect(() => {
    // Используем onSnapshot для обновления данных в режиме реального времени
    const unsubscribe = onSnapshot(query(postsRef, orderBy("time", "desc")), (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostsList(posts);
    });

    // Возвращаем функцию отписки для очистки слушателя при размонтировании компонента
    return () => unsubscribe();
  }, [postsRef]);

  // Возвращаем разметку компонента
  return (
    <main>
      {/* <Banner pageName={"О студии"} imgSrc={"banner-crystal-jump.JPG"} /> */}
      <div></div>
      <div className="wrapper wrapperChat">
        {/* Отображаем список постов */}
        <div className="posts">
          {postsList?.reverse().map((post) => (
            <Post post={post} />
          ))}
        </div>

        <CreatePostForm />
      </div>
      <div></div>
    </main>
  );
};
