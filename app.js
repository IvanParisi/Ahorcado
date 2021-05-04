const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener('click', startGame));

function startGame(event)
{
    const button = event.currentTarget;
    const playerDifficulty = button.dataset.choice;
    sessionStorage.setItem("difficulty", playerDifficulty);
    window.location.href = "game.html";

}






