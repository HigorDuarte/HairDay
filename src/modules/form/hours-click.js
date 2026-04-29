
// export = libera a função para a exportação.
// Esta função, hoursClick, adiciona a classe "hour-selected" nos horários,
export function hoursClick(){
  
  // A const hours recebe a htmlList de querySelectorAll de todos os elementos que possuem a classe .hour-available
  const hours = document.querySelectorAll(".hour-available");
  // Pega cada elemento de hours e devolve como available
  hours.forEach((available) => {
    // Adiciona o evento de click para cada elemento de hours
    available.addEventListener("click", (event) => {
      // O método toggle verifica se há a classe "hour-selected" ou não, se houver, ele tira, se não houver, ele adiciona no elemento que foi clicado.
      available.classList.toggle("hour-selected")
    })
  })
}