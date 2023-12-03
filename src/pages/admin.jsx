import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { admin, auth, groupsRef, usersRef } from "../config/firebase.ts";
import React, { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import {showError} from '../components/Error.jsx'

export const Admin = () => {
  let [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user?.uid !== admin) {
    navigate("/profile");
  }

  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(groupsRef), (querySnapshot) => {
      const groups = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGroupsList(groups);
    });

    return () => unsubscribe();
  }, [groupsRef]);

  function transliterate(text) {
    const cyrillicToLatinMap = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "e",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
      " ": "",
    };

    return text
      .split("")
      .map((char) => cyrillicToLatinMap[char] || char)
      .join("");
  }

  const onCreateUser = async (e) => {
    e.preventDefault();

    try {
      const email = transliterate(name.toLowerCase().replace(/\s/g, '')) + "@tiptop-crystal.com";
      console.log(email);
      const password = transliterate(name.toLowerCase().replace(/\s/g, ''));

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(auth.currentUser, { displayName: name });
      console.log("User created with email and password:", user);

        await addDoc(usersRef, {
          displayName: name,
          realName: name,
          birthDate: Timestamp.fromDate(new Date(birthDate)),
          userId: user?.uid,
          group: group,
          photoURL: "",
          nickname: transliterate(name.toLowerCase().replace(/\s/g, '')),
        });
    
        if (group) {
          let group_obj = groupsList.find(
            (groupDoc) => groupDoc.id === group
          ).names;
          console.log(group_obj);
    
          setGroup(group.trim());
          try {
            await updateDoc(doc(groupsRef, group), {
              names: [...group_obj, name],
            });
            setGroupsList([...group_obj, name]);
    
            console.log(`Пользователь успешно добавлен в группу "${group}".`);
          } catch (error) {
            console.error(
              "Ошибка при добавлении пользователя",
              user,
              "в группу: ",
              group
            );
            console.log(error);
          }
        }
      
      const a = getAuth();
      signOut(a)
        .then(() => {})
        .catch((error) => {});

      signInWithEmailAndPassword(auth, "admin@tiptop-crystal.com", "admin_")
        .then((userCredential) => {
          navigate("/admin");
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    } catch (error) {
      showError(error,"Ошибка при создании пользователя: " + name)

      console.error("Error creating user:", error);
    }
  };

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperAdmin">
        <form onSubmit={onCreateUser}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="name"
          />
          {/* <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email"
          /> */}
          <select
            name="group"
            id="group"
            required
            onChange={(e) => {
              return setGroup(e.target.value);
            }}
            defaultValue={""}
          >
            <option value="" disabled>
              -- Не выбрано --
            </option>
            {groupsList.map((groupItem, index) => {
              return (
                <option value={groupItem.id} key={index}>
                  {groupItem.id}
                </option>
              );
            })}
          </select>
          <input
            type="date"
            required
            className="birthDate"
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <button>Добавить пользователя</button>
        </form>
        <p></p>
        <div className="students">
          {groupsList.map((group) => {
            return (
              <div className="group">
                <div className="groupName">{group.id}</div>
                {group.names.sort().map((name) => {
                  return (
                    <div>
                      <div>{name}</div>
                    </div>
                  );
                })}
                <br />
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
    </main>
  );
};
