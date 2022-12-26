function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset["playerid"]; //+"1" => 1 (i.e. str to int)
  configOverlay.style.display = "block";
  backdrop.style.display = "block";
}

function closePlayerConfig() {
  configOverlay.style.display = "none";
  backdrop.style.display = "none";
  form.firstElementChild.classList.remove("error");
  errorsOutput.textContent = "";
  form.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("new-player").trim();
  //   console.log(enteredPlayername);

  // if (!enteredPlayername) { // empty string is a falsy value
  if (enteredPlayername === "") {
    event.target.firstElementChild.classList.add("error");
    errorsOutput.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerData = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  //   console.log(updatedPlayerData);
  updatedPlayerData.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;
  //   console.log(players);

  closePlayerConfig();
}
