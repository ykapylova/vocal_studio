import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase.ts";
import { getAuth, updateProfile } from "firebase/auth";

export const Profile = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [usersList, setUsersList] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const usersRef = collection(db, "users");

  const [groupsList, setGroupsList] = useState([]);
  const groupsRef = collection(db, "groups");

  const [group, setGroup] = useState("");

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      const getUsers = async () => {
        const usersRef = collection(db, "users");
        try {
          const querySnapshot = await getDocs(usersRef);
          const users = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsersList(users);
          setUserInfo(users.find((userDoc) => userDoc.userId === user?.uid));
        } catch (error) {
          console.error("Ошибка при получении данных пользователя:", error);
        }
      };
      getUsers();
    }

    const unsubscribe = onSnapshot(query(groupsRef), (querySnapshot) => {
      const groups = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGroupsList(groups);
    });

    const foundGroup = groupsList.find((group) =>
      group.names.includes(userInfo.displayName)
    );
    if (foundGroup) {
      setGroup(foundGroup.id);
    }

    return () => unsubscribe();
  }, [user, groupsRef]);

  const updateDisplayName = async () => {
    const nameInput = document.querySelector(".name");
    if (nameInput) {
      const newName = nameInput.value.trim();

      if (newName) {
        try {
          await updateProfile(auth.currentUser, { displayName: newName });
          await updateDoc(
            doc(
              usersRef,
              usersList.find((userDoc) => userDoc.userId === user?.uid).id
            ),
            { displayName: newName }
          );
          setUserInfo({ ...userInfo, displayName: newName });

          console.log("Имя пользователя успешно обновлено.");
          nameInput.value = "";
          window.location.reload(false);
        } catch (error) {
          console.error("Ошибка при обновлении имени пользователя:", error);
        }
      }
    }
  };

  const updatePhotoURL = async (event, operationType) => {
    setLoader(true);
    document.body.style.overflow = "hidden";
    try {
      let downloadURL = "";
      if (operationType === "update") {
        const file = event.target.files[0];
        if (file) {
          const storageRef = ref(storage, `images/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          await uploadTask;
          downloadURL = await getDownloadURL(storageRef);
        }
      }

      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      await updateDoc(
        doc(
          usersRef,
          usersList.find((userDoc) => userDoc.userId === user?.uid).id
        ),
        { photoURL: downloadURL }
      );

      setUserInfo({ ...userInfo, photoURL: downloadURL });
      console.log("Изображение профиля успешно обновлено.");
      setLoader(false);
      window.location.reload(false);
    } catch (error) {
      console.error("Ошибка при обновлении изображения профиля:", error);
    }
  };

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperProfile">
        <div className="loading" style={{ display: loader ? "flex" : "none" }}>
          <img src="img/loading.gif" alt="loading..." />
        </div>
        <div className="profile-image">
          {userInfo?.photoURL && <img src={userInfo?.photoURL} alt="Profile" />}

          <div className="new-image-setting">
            <label className="custom-file-upload">
              <input
                type="file"
                className="image"
                onChange={(e) => updatePhotoURL(e, "update")}
                accept="image/*"
              />
              <div>Загрузить новое изображение</div>
            </label>
          </div>

          <button onClick={(e) => updatePhotoURL(e, "delete")}>
            Удалить текущее изображение
          </button>
        </div>

        <div className="profile-settings">
          <div className="name-container">
            <div>Имя пользователя</div>
            <div className="new-name-form">
              <input
                type="text"
                placeholder={userInfo?.displayName || ""}
                className="name"
              />
              <button onClick={updateDisplayName}>Изменить имя</button>
            </div>
          </div>
          <div className="email-container">
            <div>E-mail</div>
            <div className="new-name-form">
              <input
                type="text"
                placeholder={user?.email}
                className="email"
                readOnly
              />
            </div>
          </div>
          {group && (
            <div className="group-container">
              <div>Группа</div>
              <div className="new-name-form">
                <input
                  type="text"
                  placeholder={group}
                  className="group"
                  readOnly
                />
                {/* <button onClick={updateGroup}>Изменить группу</button> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </main>
  );
};
