// Importando os horarios disponiveis na agenda
import { schedulesDays } from "../schedules/load.js";

// Pegando o formulário de calendário
const selectedDate = document.getElementById("date");

// Toda vez que o dia do formulário de calendário mudar, carrega os horarios do dia selecionado. 
selectedDate.onchange = () => schedulesDays();