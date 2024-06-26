const usernameForm = document.getElementById("usernameForm");
const usernameInput = document.getElementById("usernameInput");

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (usernameInput.value) {
    socket.emit("change username", usernameInput.value);
    usernameInput.value = "";
  }
});
