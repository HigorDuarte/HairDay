//  Importa o dayjs para o arquivo
import dayjs from "dayjs";

//  Importa o scheduleNew que são os horarios que o usuario mandou
import { scheduleNew } from "../../services/schedule-new.js"

import { schedulesDays } from "../schedules/load.js"

//  Pega o formulário 
const form = document.querySelector("form");

//  Pega o input nome do cliente
const clientName = document.getElementById("client")

//  Pega o input de data
const selectedDate = document.getElementById("date")

//  Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//  Carrega a data atual no input de data
selectedDate.value = inputToday;

//  Define o dia minimo para marcar. (do dia atual para frente)
selectedDate.min = inputToday;

//  Adiciona o evento de submit(enviar) para o form 
form.onsubmit = async (event) => {
  //  Previne os comportamentos padrões como enviar e atualizar o formulário
  event.preventDefault();

  //  Bloco de try/catch para pegar os erros
  try{
    //  Pega o valor do input name e joga para a const name e o trim tira os espaços no começo e no fim da string
    const name = clientName.value.trim();
    //  Condiciona/ se não houver name então retorna um alerta 
    if(!name) alert("Não foi possivel realizar o agendamento. Preencha o campo de nome");
    
    //  Pega a hora selecionada e 
    const hourSelected = document.querySelector(".hour-selected");
    if(!hourSelected) return alert("Selecione a hora");

    //  Recuperar somente a hora o split tira tudo depois do :
    const [hour] = hourSelected.innerText.split(":");

    //  O when recebe o dia selecionado e as horas 
    //  ex... dia 3 de selectedDate.value + hour  
    const when = dayjs(selectedDate.value).add(hour, "hour") 
    
    //  Adicionando um id que sera a hora que o cliente agendar
    const id = new Date().getTime();

    //  scheduleNew é uma requisição HTTP que envia os dados assim que o formulário for enviado, passandos estes parâmetros 
    await scheduleNew({
      name,
      hour,
      when
    })

    //  Recarrega agendamentos
    await schedulesDays();

    clientName.value = "";

  }catch(error){
    alert("não foi possivel realizar o agendamento.");
    console.log(error)
  }  
}