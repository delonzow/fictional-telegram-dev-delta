const favoriteSelect = document.querySelector("#favorite");
const profileForm = document.querySelector("#profile-form");
const profileOutput = document.querySelector("#profile-output");

async function loadOptions() {
  const response = await fetch("assets/data/data.json");

  if (!response.ok) {
    throw new Error("Could not load favorite options");
  }

  const choices = await response.json();
  console.log(choices);

  choices.forEach((choice) => {
    const option = new Option(`${choice.emoji} ${choice.name}`, choice.id);
    favoriteSelect.appendChild(option);
  });

  const savedProfile = sessionStorage.getItem("userData");
  if (savedProfile) {
    showProfile(JSON.parse(savedProfile));
  }
}

function showProfile(userData) {
  profileOutput.textContent =
    `${userData.name} likes ${userData.favorite}. ${userData.comment}`;
}

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userData = {
    name: document.querySelector("#name").value,
    favorite: favoriteSelect.options[favoriteSelect.selectedIndex].text,
    comment: document.querySelector("#comment").value
  };

  console.log(userData);

  const json = JSON.stringify(userData);
  sessionStorage.setItem("userData", json);

  const savedProfile = JSON.parse(sessionStorage.getItem("userData"));
  showProfile(savedProfile);
});

async function loadDogImage() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");

  if (!response.ok) {
    throw new Error("Could not load a dog photo");
  }

  const data = await response.json();
  console.log(data);
  document.querySelector("#dog-image").src = data.message;
}

loadOptions().catch((error) => console.error(error));
loadDogImage().catch((error) => console.error(error));
