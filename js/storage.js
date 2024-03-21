const STORAGE_TOKEN = "UYC2KGRBQ7QS5SWVHQYXYARK3RHQJN240BPE82NE";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let mainUserInfos = [{ contactBook: [], tasks: [] }];
let currentUserKey = [];
let users = [];

async function init() {
  await loadUsers();
}

async function loadUsers() {
  try {
    currentUserKey = JSON.parse(await getItem("currentUserKey")); //Besim: Laden des aktuelle users

    try {
      mainUserInfos = JSON.parse(await getItem(`${currentUserKey}`)); //Laden der INfos vom übergeordneten Array
        users = JSON.parse(await getItem("users"));
      console.log("Users DATA:", users);
      console.log("MainUser DATA:", mainUserInfos);
      console.log("Contact Book Data:", mainUserInfos[0].contactBook);
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
  console.log(key)
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
