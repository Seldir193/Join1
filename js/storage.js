const STORAGE_TOKEN = "UYC2KGRBQ7QS5SWVHQYXYARK3RHQJN240BPE82NE";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let contactBook = [];
let currentUserKey = [];

async function init() {
  loadUsers();
}

async function loadUsers() {
  try {
    currentUserKey = JSON.parse(await getItem("currentUserKey")); //Besim: Laden des aktuelle users

    try {
      contactBook = JSON.parse(await getItem("contact"));
      users = JSON.parse(await getItem("users"));
      tasks = JSON.parse(await getItem("tasks"));
      console.log("Users DATA:", users);
      users = JSON.parse(await getItem("users"));
      tasks = JSON.parse(await getItem("tasks"));
      console.warn("Users DATA:", users);
      console.log("Contact Book Data:", contactBook);
      console.log("Tasks Data:", tasks);
      renderAlphabeticalCategories();
    } catch (e) {
      console.error("Loading error:", e);
    }
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
