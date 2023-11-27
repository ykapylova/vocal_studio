import { useAuthState } from "react-firebase-hooks/auth";
import { Banner } from "../components/Banner.jsx";
import { AllGroupsSchedule } from "../components/AllGroupsSchedule.jsx";
import { auth } from "../config/firebase.ts";
import { useNavigate } from "react-router-dom";
import { ScheduleMeaning } from "../components/ScheduleMeaning.jsx";
import { AddScheduleEvent } from "../components/AddScheduleEvent.jsx";
import { AddConstantSchedule} from "../components/AddConstantSchedule.jsx";

export const ScheduleAdmin = () => {
  let [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user?.uid !== "dCQj6kSxTTM4fEtMr50lHOgMcgz1") {
    navigate("/profile");
  }

  return (
    <main>
      <h1>Расписание</h1>
      {/* <Banner pageName={"Расписание"} imgSrc={"banner-crystal-jump.JPG"} /> */}
      <div className="wrapper wrapperScheduleAdmin">
        <ScheduleMeaning />
        <AllGroupsSchedule />
        <div className="addSchedule">
          <AddScheduleEvent />
          <AddConstantSchedule />
        </div>
      </div>
      <div></div>
    </main>
  );
};
