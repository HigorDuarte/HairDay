// Importa a biblioteca dayjs para o arquivo
import dayjs from "dayjs";

// Importa openingHours, que são todos os horários de agendamento
import { openingHours } from "../../utils/opening-hours"

// Importa hoursClick, que adiciona a classe que da a borda do botão de horário
import { hoursClick } from "./hours-click";

// const hours pega o input de horas
const hours = document.getElementById("hours");

// A função recebe uma data e o dailySchedules que é os agendamentos 
// Está função retorna os horarios disponiveis e indisponiveis em uma ul, aplicando estilos como borda e opacidade,
// Podendo marcar e desmarcar os horários e limpando toda vez o hoursLoad for chamado
export function hoursLoad({date, dailySchedules}){

  // Limpa o horário toda vez que chamado
  hours.innerHTML = "";

  // const unavailableHours pega as horas indisponiveis por já estarem marcadas
  // O map retorna um novo array de cada dayliSchedules
  // Pega cada item em dailySchedules e formata todos que já foram agendados para hora e minuto  
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  // esta função retorna um array de cada item de openingHours(todos horários de agendamento) e retorna somente as disponiveis 
  const opening = openingHours.map((hour) => {

    // Recupera SOMENTE A HORA disponivel.
    const [scheduleHour,] = hour.split(":");

    // Adiciona a hora na date e verifica se esta no passado
    // Aqui é feito uma comparação com o metodo add do dayjs, é verificado se a hora do agendamento é antes
    // do dia de hoje, ou seja, não pode ser marcado porque o dia já foi. 
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());

    // const available, serve para guardar os dias disponiveis com base em duas verificações
    // 1. se a hora nao for indisponivel, por conta de já estar marcada (o horario nao pode estar agendado)
    // 2. se a hora nao estiver no passado  
    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available
    }
  })

  opening.forEach(({hour, available}) => {
    // Cria o elemento li que comporta os botoes de horario
    const li = document.createElement("li");

    // Adiciona a classe de hora no li
    li.classList.add("hour");
    // Adiciona a classe de disponivel se for ou nao disponivel
    li.classList.add(available ? "hour-available" : "hour-unavailable");
    // Adiciona a hora do agendamento no botão
    li.textContent = hour; 

    // Se a hora for 9 da manhã até as 13 adiciona o texto manhã
    // Se a hora for 13 da manhã até as 18 adiciona o texto manhã 
    // Se não for nenhum dos horários é noite 
    if (hour === "9:00") {
      hourHeadAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeadAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeadAdd("Noite");
    }

    // Adiciona no meu elemento hour que é um ul os horarios que está dentro do li  
    hours.append(li)
  })

  // Adiciona a função hoursClick que é a borda do botão se ele estiver disponivel
  hoursClick()
}

// Está função recebe como parâmetro title que sera o horario, manhã, tarde ou noite
// Ela aplica ao ul hours um li com os horarios manha e tarde
function hourHeadAdd(title) {
  // Cria o elemento li
  const header = document.createElement("li");
  // Adiciona a classe "hour-period" ao header
  header.classList.add("hour-period");
  // Adiciona o que foi dado no parâmetro ao header
  header.textContent = title;

  // adiciona o li header dentro do hours que é a ul dos horarios
  hours.append(header)
}