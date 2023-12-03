import { useAuthState } from "react-firebase-hooks/auth";
import { AllGroupsSchedule } from "../components/AllGroupsSchedule.jsx";
import { admin, auth } from "../config/firebase.ts";
import { useNavigate } from "react-router-dom";
import { ScheduleMeaning } from "../components/ScheduleMeaning.jsx";
import { AddScheduleEvent } from "../components/AddScheduleEvent.jsx";
import { AddConstantSchedule} from "../components/AddConstantSchedule.jsx";

export const ScheduleAdmin = () => {
  let [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user?.uid !== admin) {
    navigate("/profile");
  }

  return (
    <main>
      <h1>Расписание</h1>
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
