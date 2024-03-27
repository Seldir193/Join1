let currentDraggedElement;

let countToDo = [];
let countInProgress = [];
let countAwaitFeedback = [];
let countDone = [];
let letterArray = [];
let currentPriority;
let initialColorMap = {};
let randomColorCollection = {};
let addMembersValueArray = [];
let addMembersStatusArray = [];
let addSubtasks = [];
let addDoneValue = [];

let categorySet = ["Technical Task", "User Story"];

var activePriority = null;

async function onload() {
    await init();
    await includeHTML();
    displayUserProfile();
    render();
}

function render() {
    renderAddTaskFloating();

    if (mainUserInfos[0]["tasks"].length > 0) {
        for (let i = 0; i < mainUserInfos[0]["tasks"].length; i++) {
            renderShowTask(i);
        }
    }
    renderContactsOnBoard();
    updateHTML();
}

function toggleCard() {
    let card = document.getElementById("addTaskFloating");
    card.classList.toggle("activeAddTask");
    let contactBoard = document.getElementById("listContactContainerBoard");
    if (contactBoard.classList.contains("dFlex")) {
        contactBoard.classList.remove("dFlex");
        contactBoard.classList.add("dNone");
    }
}

function toggleCardFromBoard() {
    let card = document.getElementById(`tasksOverBoardContainer${i}`);
    card.classList.toggle("active");
}

function searchTasks() {
    // Eingabewert aus dem Inputfeld abrufen
    let inputValue = document
        .getElementById("searchTasksInput")
        .value.toLowerCase();

    // Alle Task-Container durchlaufen und den Eingabewert suchen
    for (let i = 0; i < toDo["tasks"].length; i++) {
        //WICHTIG, HIER MUSS NOCH FÜR ALLE ANDEREN CATEGORYS DER WERT EINGEFÜGT WERDEN FÜR DIE LENGTH
        let container = document.getElementById("newTaskFloating" + i);
        let headline = document
            .getElementById("headlineValue" + i)
            .innerText.toLowerCase();
        let description = document
            .getElementById("descriptionValue" + i)
            .innerText.toLowerCase();
        let date = document.getElementById("dateValue" + i).innerText.toLowerCase();
        let priority = document
            .getElementById("priorityValue" + i)
            .innerText.toLowerCase();
        let profil = document
            .getElementById("profilValue" + i)
            .innerText.toLowerCase();
        let subtask = document
            .getElementById("subtaskValue" + i)
            .innerText.toLowerCase();

        // Überprüfen, ob der Eingabewert in einem der Felder gefunden wird
        if (
            headline.includes(inputValue) ||
            description.includes(inputValue) ||
            date.includes(inputValue) ||
            priority.includes(inputValue) ||
            profil.includes(inputValue) ||
            subtask.includes(inputValue)
        ) {
            // Falls der Eingabewert gefunden wird, den Container anzeigen
            container.classList.remove("dNone");
        } else {
            // Andernfalls den Container ausblenden
            container.classList.add("dNone");
        }
    }
}

function renderNoTasks() {
    checkNoTasksToDo();
    checkNoTasksInProgress();
    checkNoTasksAwaitFeedback();
    checkNoTasksDone();
}

function updateHTML() {
    swapToDo();
    swapInProgress();
    swapAwaitFeedback();
    swapDone();
    for (let i = 0; i < mainUserInfos[0]["tasks"].length; i++) {
        fillTasksOnBoard(i);
        progress(i);
        transformPriorityToImg(i);
    }
    renderNoTasks();
}

function swapToDo() {
    let addedToDo = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "toDoTasks"
    );
    document.getElementById("toDoTasks").innerHTML = "";
    for (let i = 0; i < addedToDo.length; i++) {
        const element = addedToDo[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("toDoTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo
        );
    }
}

function swapInProgress() {
    let addedInProgress = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "inProgressTasks"
    );
    document.getElementById("inProgressTasks").innerHTML = "";
    for (let i = 0; i < addedInProgress.length; i++) {
        const element = addedInProgress[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("inProgressTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo
        );
    }
}

function swapAwaitFeedback() {
    let addedAwaitFeedback = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "awaitFeedbackTasks"
    );
    document.getElementById("awaitFeedbackTasks").innerHTML = "";
    for (let i = 0; i < addedAwaitFeedback.length; i++) {
        const element = addedAwaitFeedback[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("awaitFeedbackTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo
        );
    }
}

function swapDone() {
    let addedDone = mainUserInfos[0]["tasks"].filter(
        (t) => t["box"] == "doneTasks"
    );
    document.getElementById("doneTasks").innerHTML = "";
    for (let i = 0; i < addedDone.length; i++) {
        const element = addedDone[i];
        let currentUserInfo = mainUserInfos[0]["tasks"][i];
        document.getElementById("doneTasks").innerHTML += generateTodoHTML(
            element,
            currentUserInfo
        );
    }
}

function fillTasksOnBoard(i) {
    addTitleValue(i);
    addDescriptionValue(i);
    // addDateValue(i);
    addCategoryValue(i);
    addMembersValue(i);
}

function addMembersValue(i) {
    for (let j = 0; j < mainUserInfos[0]["tasks"][i].members.length; j++) {
        let memberFirstLetter = mainUserInfos[0]["tasks"][i].members[j]
            .charAt(0)
            .toUpperCase();
        document.getElementById(`profilsOnBoard${i}`).innerHTML += `
        <div class="profileOnBoard" id="selectedProfilOnBoard${i}">${memberFirstLetter}</div>
    `;
    }
    assignRandomBackgroundColor();
}

function addTitleValue(i) {
    document.getElementById(`titleOnBoard${i}`).innerHTML = ``;
    let addTitleValue = mainUserInfos[0]["tasks"][i]["title"];
    document.getElementById(`titleOnBoard${i}`).innerHTML = `${addTitleValue}`;
}

function addDescriptionValue(i) {
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = "";
    let addDescriptionValue = mainUserInfos[0]["tasks"][i]["description"];
    document.getElementById(
        `descriptionOnBoard${i}`
    ).innerHTML = `${addDescriptionValue}`;
}

// function addDateValue(i) {
//     let addDateValue = mainUserInfos[0]['tasks']['dueDate'];
//     document.getElementById('#');
// }

function addCategoryValue(i) {
    document.getElementById(`categoryOnBoard${i}`).innerHTML = ``;
    let addCategoryValue = mainUserInfos[0]["tasks"][i]["category"];
    document.getElementById(`categoryOnBoard${i}`).innerHTML = `
        <button id="technicalAndUserBtn${i}">${addCategoryValue}</button>
    `;
    if (addCategoryValue == "User Story") {
        document
            .getElementById(`technicalAndUserBtn${i}`)
            .classList.add("UserStoryBtn");
    } else {
        document
            .getElementById(`technicalAndUserBtn${i}`)
            .classList.add("technicalTaskBtn");
    }
}

function addSubTaskValue(i) {
    // document.getElementById(`checkBoxContainer`).innerHTML = '';
    for (let j = 0; j < mainUserInfos[0]["tasks"][i]["subtasks"].length; j++) {
        let addSubTaskValue = mainUserInfos[0]["tasks"][i]["subtasks"][j];
        document.getElementById(`checkBoxContainer`).innerHTML += `
        <span>${addSubTaskValue}</span>
    `;
    }
}

async function pushToDo(newToDo) {
    mainUserInfos[0]["tasks"].push(newToDo);
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateHTML();
    addMembersValueArray = [];
    addSubtasks = [];
    addMembersValue = [];
}

function addPriorityValue(element) {
    currentPriority = element;
    return currentPriority;
}

function fillArray() {
    let countIDs = mainUserInfos[0]["tasks"].length;
    let addTitleValue = addTitleToBoard();
    let addDescriptionValue = addDescriptionToBoard();
    let addDateValue = addDueDateToBoard();
    let addCategoryValue = addCategoryToBoard();
    let addDoneValue = addDoneToBoard();
    let addMembersValue = addMembersToTask();
    let newToDo = {
        id: `${countIDs}`,
        box: "toDoTasks",
        title: `${addTitleValue}`,
        description: `${addDescriptionValue}`,
        category: `${addCategoryValue}`,
        dueDate: `${addDateValue}`,
        members: addMembersValue,
        subtasks: addSubtasks,
        done: addDoneValue,
        priority: currentPriority,
    };

    pushToDo(newToDo);
    clearAddTaskFloating();
}


function addMembersToTask() {
    let addMembersValue = [];
    for (let i = 0; i < addMembersStatusArray.length; i++) {
        let element = addMembersStatusArray[i];
        if (element === true) {
            addMembersValue.push(addMembersValueArray[i])
        } 
    }
    return addMembersValue
}

async function deleteTask(i) {
    mainUserInfos[0]["tasks"].splice(i, 1);
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateHTML();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(box) {
    mainUserInfos[0]["tasks"][currentDraggedElement]["box"] = box;
    updateHTML();
}

function clearAddTaskFloating() {
    let titleEnter = document.getElementById("titleAddTaskFloating");
    titleEnter.value = "";

    let descriptionInput = document.getElementById("descriptionAddTaskFloating");
    descriptionInput.value = "";

    let dateInput = document.getElementById("dueDateAddTaskFloating");
    dateInput.value = "";

    let listContactContainer = document.getElementById("assignedInput");
    listContactContainer.innerHTML = "";

    let categoryInput = document.getElementById("categoryInput");
    categoryInput.value = "";

    let subTaskInput = document.getElementById("subTaskInput");
    subTaskInput.innerHTML = "";
}

function togglePriority(priority) {
    if (activePriority === priority) {
        activePriority = null;
    } else {
        if (activePriority !== null) {
            document
                .getElementsByTagName("button")
            [activePriority - 1].classList.remove("active");
        }
        activePriority = priority;
    }
}

function toggleCategory() {
    var listTechnical = document.getElementById("listTechnical");
    var categoryDropdown = document.getElementById("categoryDropdown");

    if (
        listTechnical.style.display === "none" ||
        listTechnical.style.display === ""
    ) {
        listTechnical.style.display = "block";
        categoryDropdown.src = "assets/img/arrow_drop_up.png";
        categoryInput.focus();
    } else {
        listTechnical.style.display = "none";
        categoryDropdown.src = "assets/img/arrow_drop_down.png";
    }
}

function toggleBackgroundColor(element) {
    element.classList.toggle("activePrio");
}

function resetBackgroundColors() {
    const buttons = document.querySelectorAll(".priority-box nav");
    buttons.forEach((button) => button.classList.remove("activePrio"));
}

// function toggleIcon() {
//     var listContactContainer = document.getElementById("listContactContainer");
//     var listTechnical = document.getElementById("listTechnical");
//     var icon = document.getElementById("icon");

//     listTechnical.style.display = "none";

//     if (
//         listContactContainer.style.display === "none" ||
//         listContactContainer.style.display === ""
//     ) {

//         icon.src = "assets/img/arrow_drop_up.png";
//     } else {

//         icon.src = "assets/img/arrow_drop_down.png";
//     }
// }

function technicalUser() {
    let technical = document.getElementById("listTechnical");
    technical.innerHTML = "";

    for (let k = 0; k < categorySet.length; k++) {
        technical.innerHTML += `<div class="select" onclick="chosenTechnicalUser('${categorySet[k]}')">${categorySet[k]}</div>`;
    }
}

function chosenTechnicalUser(category) {
    document.getElementById("categoryInput").value = `${category}`;
}

function valueSubtask() {
    let valueSubtask = document.getElementById("subTaskInput").value;
    addSubtasks.push(valueSubtask);
    valueSubtask.innerHTML = "";
    document.getElementById("subtaskList").innerHTML += `
    <div>${valueSubtask}</div>
    `;
}

function renderContactsOnBoard() {
    document.getElementById("listContactContainerBoard").innerHTML = ``;
    let contactBoard = document.getElementById("listContactContainerBoard");
    if (contactBoard.classList.contains("dNone")) {
        contactBoard.classList.remove("dNone");
        contactBoard.classList.add("dFlex");
    } else {
        contactBoard.classList.add("dNone");
        contactBoard.classList.remove("dFlex");
    }
    if (mainUserInfos[0]["contactBook"]) {
        for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
            contactBoard.innerHTML += `
    <div class="contactsBoardContainer">
        <div class="contactsBoardContainerChild">   
            <div class="styleMembersAddTask" id="profilMember${i}"></div>
            <span class="nameMember" id="nameMember${i}"></span>
        </div>
        <input class="customCheckbox" id="checkboxMember${i}" type="checkbox" onchange="updateStatus(${i})">
    </div>
    `;
            fillContactsOnBoard(i);
        }
        assignRandomBackgroundColor();
    }
}

function assignRandomBackgroundColor() {
    const elementsWithProfilMember = document.querySelectorAll(
        '[id^="profilMember"]'
    );
    const elementsWithSelectedProfilOnBoard = document.querySelectorAll(
        '[id*="selectedProfilOnBoard"]'
    );

    elementsWithProfilMember.forEach((element) => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // Zufällige Hex-Farbe generieren
        element.style.backgroundColor = randomColor; // Hintergrundfarbe zuweisen
    });

    elementsWithSelectedProfilOnBoard.forEach((element) => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // Zufällige Hex-Farbe generieren
        element.style.backgroundColor = randomColor; // Hintergrundfarbe zuweisen
    });
}

function fillContactsOnBoard(i) {
    const fullName = mainUserInfos[0]["contactBook"][i]["name"];
    const initials = fullName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
    document.getElementById(`profilMember${i}`).innerHTML = `${initials}`;
    document.getElementById(`nameMember${i}`).innerHTML = `${fullName}`;
}

function progress(i) {
    if (mainUserInfos[0]["tasks"][i]["done"].length > 0) {
        let progress = mainUserInfos[0]["tasks"][i]["done"].filter(
            (item) => item === true
        ).length;
        let goal = mainUserInfos[0]["tasks"][i]["subtasks"].length;
        document.getElementById(`progress${i}`).style.width =
            (progress / goal) * 100 + "%";
    }
}

// function updateProgress(i) {
//     var checkbox = document.getElementById(`checkboxContact${i}`);
//     if (!checkbox.checked) {
//         let doneCount = 0;
//         mainUserInfos[0]['tasks'][i]['done'].pop(doneCount);
//     } else {
//         let doneCount = 0;
//         mainUserInfos[0]['tasks'][i]['done'].push(doneCount);
//     }
// }

function pushMembers() {
    for (let i = 0; i < mainUserInfos[0]["contactBook"].length; i++) {
        let addMembersValue = mainUserInfos[0]["contactBook"][i]["name"];
        addMembersValueArray.push(addMembersValue);
        addMembersStatusArray.push('false');
    }
}


function updateStatus(i) {
    let status = addMembersStatusArray;
    let checkbox = document.getElementById(`checkboxMember${i}`);
    if (checkbox.checked) {
        status[i] = true;
    } else {
        status[i] = false;
    }
}



function deleteMember(i) {
    addMembersValueArray.splice(i, 1);
}

function transformPriorityToImg(i) {
    if (mainUserInfos[0]["tasks"][i]["priority"] === "low") {
        document.getElementById(`priorityOnBoard${i}`).innerHTML = `
        <img src="assets/img/Prio baja.png" alt="low priority">
        `;
    }
    if (mainUserInfos[0]["tasks"][i]["priority"] === "medium") {
        document.getElementById(`priorityOnBoard${i}`).innerHTML = `
        <img src="assets/img/Prio media (1).png" alt="medium priority">
        `;
    }
    if (mainUserInfos[0]["tasks"][i]["priority"] === "urgent") {
        document.getElementById(`priorityOnBoard${i}`).innerHTML = `
        <img src="assets/img/Prio alta.png" alt="urgent priority">
        `;
    }
}

async function checkSubtasks(i, j) {
    let checkbox = document.getElementById(`checkbox${j}`);
    if (checkbox.checked) {
        mainUserInfos[0]["tasks"][i]["done"][j] = true;
    } else {
        mainUserInfos[0]["tasks"][i]["done"][j] = false;
    }
    await setItem(`${currentUserMail}`, JSON.stringify(mainUserInfos));
    updateCheckBoxes(i);
}

function updateCheckBoxes(i) {
    for (let j = 0; j < mainUserInfos[0]["tasks"][i]["done"].length; j++) {
        if (mainUserInfos[0]["tasks"][i]["done"][j] === true) {
            document.getElementById(`checkbox${j}`).checked = true;
        } else {
            document.getElementById(`checkbox${j}`).checked = false;
        }
    }
}

function ClearAddMembersValueArray() {
    addMembersValueArray = [];
}
