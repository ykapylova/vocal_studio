import { getAuth, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase.ts";
import { useState } from "react";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";

export const Profile = () => {
  const a = getAuth();
  const storage = getStorage();
  const [user] = useAuthState(auth);
  const [photoURLsList, setPhotoURLsList] = useState(null);

  const photoURLsRef = collection(db, "users");

  const getPhotoURLs = async () => {
    const querySnapshot = await getDocs(query(photoURLsRef));
    // Обновляем состояние postsList данными из Firestore
    const photoURLs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPhotoURLsList(photoURLs);
  };

  const updateDisplayName = () => {
    const name = document.querySelector(".name");
    if (name) {
      updateProfile(a.currentUser, {
        displayName: name.value,
      })
        .then(() => {
          name.value = "";
          
          photoURLsList?.map(async (userPhotoDoc) => {
            if (userPhotoDoc.userId == user.uid) {
              try {
                // Обновляем поле "name" пользователя
                const userDoc = doc(db, "usersPhotoURLs", userPhotoDoc.id);
                const newFields = { displayName: name.value };
                await updateDoc(userDoc, newFields);

                // await photoURLsRef.doc(userPhotoDoc).update({
                //   photoURL: downloadURL,
                // });

                console.log(
                  'Поле "photoURL" пользователя успешно обновлено.'
                );
              } catch (error) {
                console.error(
                  'Ошибка при обновлении поля "photoURL":',
                  error
                );
              }
            }
          });

          window.location.reload();
        })
        .catch((error) => {
          console.log("Не удалось обновить имя пользователя");
        });
    }
  };
  

  const updatePhotoURL = () => {
    const file = document.querySelector(".image").files[0];
    if (!file) {
      return 0;
    }

    const storageRef = ref(storage, "images/" + file.name);

    // Загрузите файл в Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Отслеживайте состояние загрузки
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // удаление старого изображения

          // let oldPhotoURL = null;
          // let deleteFileName = null;
          // try {
          //   oldPhotoURL = a.currentUser.photoURL.split("%2F");
          //   deleteFileName = oldPhotoURL[oldPhotoURL.length - 1].split("?")[0];
          // } catch (error) {
          //   console.log("Пользователь установил первое изображение");
          // }

          updateProfile(a.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              // удаление старого изображения

              // deleteObject(ref(storage, "images/" + deleteFileName)).catch(
              //   () => {
              //     console.log("Не удалось удалить предыдущее фото");
              //   }
              // );

              const getPhotoURLs = async () => {
                const querySnapshot = await getDocs(query(photoURLsRef));
                // Обновляем состояние postsList данными из Firestore
                const photoURLs = querySnapshot.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                }));
                setPhotoURLsList(photoURLs);
              };

              getPhotoURLs();

              photoURLsList?.map(async (userPhotoDoc) => {
                if (userPhotoDoc.userId == user.uid) {
                  try {
                    // Обновляем поле "name" пользователя
                    const userDoc = doc(db, "usersPhotoURLs", userPhotoDoc.id);
                    const newFields = { photoURL: downloadURL };
                    await updateDoc(userDoc, newFields);

                    // await photoURLsRef.doc(userPhotoDoc).update({
                    //   photoURL: downloadURL,
                    // });

                    console.log(
                      'Поле "photoURL" пользователя успешно обновлено.'
                    );
                  } catch (error) {
                    console.error(
                      'Ошибка при обновлении поля "photoURL":',
                      error
                    );
                  }
                }
              });

              // window.location.reload();
            })
            .catch((error) => {
              console.error(error);
              console.log("Не удалось изменить изображение");
            });
        });
      }
    );
  };

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperProfile">
        <div className="profile-image">
          <img src={user?.photoURL} alt="" />
          <div className="new-image-setting">
            <label className="custom-file-upload">
              <input type="file" className="image" onChange={updatePhotoURL} />
              <div>Загрузить новое изображение</div>
              <img src="img/icons/icon-upload-file.png" alt="" />
            </label>
          </div>
        </div>

        <div className="profile-settings">
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
      </div>
      <div></div>
    </main>
  );
};
