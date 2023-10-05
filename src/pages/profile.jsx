import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase.ts";
import { getAuth, updateProfile } from "firebase/auth";

export const Profile = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [photoURLsList, setPhotoURLsList] = useState([]);

  const photoURLsRef = collection(db, "users");

  useEffect(() => {
    const getPhotoURLs = async () => {
      const querySnapshot = await getDocs(photoURLsRef);
      const photoURLs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPhotoURLsList(photoURLs);
    };

    getPhotoURLs();
  }, [photoURLsRef]);

  const updateDisplayName = async () => {
    const nameInput = document.querySelector(".name");
    if (nameInput) {
      const newName = nameInput.value.trim();

      if (newName) {
        try {
          await updateProfile(auth.currentUser, { displayName: newName });
          await updateDoc(
            photoURLsRef.doc(
              photoURLsList.find((userDoc) => userDoc.userId == user.uid)
            ),
            { displayName: newName }
          );
          console.log("Имя пользователя успешно обновлено.");
        } catch (error) {
          console.error("Ошибка при обновлении имени пользователя:", error);
        }
      }
    }
  };

  const updatePhotoURL = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;

        const downloadURL = await getDownloadURL(storageRef);

        // Ожидаем завершения запроса getDocs и обновляем данные
        await getDocs(photoURLsRef).then((querySnapshot) => {
          const updatedPhotoURLsList = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          // На этом этапе у нас есть обновленный массив данных photoURLsList
          // Обновляем photoURL в Firestore
          const userDoc = updatedPhotoURLsList.find(
            (userDoc) => userDoc.userId === user.uid
          );
          if (userDoc) {
            const userDocRef = doc(photoURLsRef, userDoc.id);
            updateDoc(userDocRef, { photoURL: downloadURL });
          }
        });

        // Обновляем фото пользователя в аутентификации Firebase
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
        console.log("Изображение профиля успешно обновлено.");
      } catch (error) {
        console.error("Ошибка при обновлении изображения профиля:", error);
      }
    }
  };

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperProfile">
        <div className="profile-image">
          <img src={user?.photoURL} alt="Profile" />
          <div className="new-image-setting">
            <label className="custom-file-upload">
              <input
                type="file"
                className="image"
                onChange={updatePhotoURL}
                accept="image/*"
              />
              <div>Загрузить новое изображение</div>
            </label>
          </div>
        </div>

        <div className="profile-settings">
          <div className="displayName">
            <div>Имя пользователя</div>
            <div className="new-name-form">
              <input
                type="text"
                placeholder={user?.displayName}
                className="name"
              />
              <button onClick={updateDisplayName}>Изменить имя</button>
            </div>
          </div>
          <div className="email">
            <div>E-mail</div>
            <div className="new-name-form">
              <input
                type="text"
                placeholder={user?.email}
                className="name"
              />
            </div>
          </div>
          <div className="group">
            <div>Группа</div>
            <div className="new-name-form">
              <input
                type="text"
                placeholder={user?.group}
                className="name"
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
};
