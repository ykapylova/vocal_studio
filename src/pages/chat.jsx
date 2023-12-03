import { onSnapshot, orderBy, query } from "firebase/firestore";
import { postsRef } from "./../config/firebase.ts";
import { useEffect, useState } from "react";
import { CreatePostForm } from "../components/CreatePostForm.jsx";
import { Post } from "../components/Post.jsx";

export const Chat = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(postsRef, orderBy("time")),
      (querySnapshot) => {
        const posts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPostsList(posts);
      }
    );

    return () => unsubscribe();
  }, [postsRef]);

  return (
    <main>
      <div>
        <h1>Чат</h1>
      </div>
      <div className="wrapper wrapperChat">
        <div className="posts">
          {postsList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <CreatePostForm />
      </div>
      <div></div>
    </main>
  );
};
