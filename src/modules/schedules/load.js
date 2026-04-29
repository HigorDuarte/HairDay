import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";

//Seleciona o input de data
const selectedDate = document.getElementById("date");

export async function schedulesDays() {

  const date = selectedDate.value;

  const dailySchedules = await scheduleFetchByDay({ date });

  scheduleShow({ dailySchedules });  

  hoursLoad({ date, dailySchedules });
}