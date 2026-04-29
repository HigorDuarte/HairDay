import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDays } from "../schedules/load.js";

const periods = document.querySelectorAll(".period");

periods.forEach((periods) => {
  periods.addEventListener("click", async (e) => {
    if(e.target.classList.contains('cancel-icon')){
      const item = e.target.closest("li");
      const { id } = item.dataset
      
      if(id){
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?") 
        
        if(isConfirm){
          await scheduleCancel({id})
          schedulesDays()
        }
      }
    }
  })
})