import { useEffect, useState } from "react";
import { usersRef } from "../config/firebase.ts";
import { getDocs, query } from "firebase/firestore";

export const Post = (props) => {
  const [usersList, setUsersList] = useState(null);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return `${String(date.getDate()).padStart(2, "0")}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${date.getFullYear()} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(query(usersRef));
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsersList(users);
    };
    getUsers();
  }, []);

  const postUser =
    usersList?.find((userInfo) => userInfo.userId === props.post.userId) || {};
  const { photoURL, displayName } = postUser;
  const time = formatDate(props.post?.time);

  return (
    <div className="post">
      <div className="post-user-photo">
        <img src={photoURL || ""} alt="" width={50} />
      </div>
      <div>
        <div className="username">{displayName || ""}</div>
        <div className="time">{time}</div>
        <div className="text">{props.post.text}</div>
      </div>
    </div>
  );
};
