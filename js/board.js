let currentDraggedElement;

let countToDo = [];
let countInProgress = [];
let countAwaitFeedback = [];
let countDone = [];

let currentPriority;

let categorySet = ["Technical Task", "User Story"];

let nextId = 0;

var activePriority = null;

async function onload() {
    await init();
    includeHTML();
    render();
}


function render() {
    for (i = 0; i < 1; i++) {

        renderAddTaskFloating();
        renderNoTasks();
        if (mainUserInfos[0]['tasks'].length > 0 ){
        renderShowTask();}
    }
}


function toggleCard() {
    let card = document.getElementById('addTaskFloating');
    card.classList.toggle('activeAddTask');
}


function toggleCardFromBoard() {
    let card = document.getElementById(`tasksOverBoardContainer${i}`);
    card.classList.toggle('active');
}


function searchTasks() {
    // Eingabewert aus dem Inputfeld abrufen
    let inputValue = document.getElementById("searchTasksInput").value.toLowerCase();

    // Alle Task-Container durchlaufen und den Eingabewert suchen
    for (let i = 0; i < toDo['tasks'].length; i++) { //WICHTIG, HIER MUSS NOCH FÜR ALLE ANDEREN CATEGORYS DER WERT EINGEFÜGT WERDEN FÜR DIE LENGTH
        let container = document.getElementById("newTaskFloating" + i);
        let headline = document.getElementById("headlineValue" + i).innerText.toLowerCase();
        let description = document.getElementById("descriptionValue" + i).innerText.toLowerCase();
        let date = document.getElementById("dateValue" + i).innerText.toLowerCase();
        let priority = document.getElementById("priorityValue" + i).innerText.toLowerCase();
        let profil = document.getElementById("profilValue" + i).innerText.toLowerCase();
        let subtask = document.getElementById("subtaskValue" + i).innerText.toLowerCase();

        // Überprüfen, ob der Eingabewert in einem der Felder gefunden wird
        if (headline.includes(inputValue) ||
            description.includes(inputValue) ||
            date.includes(inputValue) ||
            priority.includes(inputValue) ||
            profil.includes(inputValue) ||
            subtask.includes(inputValue)) {
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
    for (i = 0; i < mainUserInfos[0]['tasks'].length; i++) {
        fillTasksOnBoard(i);
    }
}


function swapToDo() {
    let addedToDo = mainUserInfos[0]['tasks'].filter(t => t['box'] == 'toDoTasks');
    document.getElementById('toDoTasks').innerHTML = '';
    for (let i = 0; i < addedToDo.length; i++) {
        const element = addedToDo[i];
        let currentUserInfo = mainUserInfos[0]['tasks'][i];
        document.getElementById('toDoTasks').innerHTML += generateTodoHTML(element, currentUserInfo);
    }
}


function swapInProgress() {
    let addedInProgress = mainUserInfos[0]['tasks'].filter(t => t['box'] == 'inProgressTasks');
    document.getElementById('inProgressTasks').innerHTML = '';
    for (let i = 0; i < addedInProgress.length; i++) {
        const element = addedInProgress[i];
        let currentUserInfo = mainUserInfos[0]['tasks'][i];
        document.getElementById('inProgressTasks').innerHTML += generateTodoHTML(element, currentUserInfo);
    }
}


function swapAwaitFeedback() {
    let addedAwaitFeedback = mainUserInfos[0]['tasks'].filter(t => t['box'] == 'awaitFeedbackTasks');
    document.getElementById('awaitFeedbackTasks').innerHTML = '';
    for (let i = 0; i < addedAwaitFeedback.length; i++) {
        const element = addedAwaitFeedback[i];
        let currentUserInfo = mainUserInfos[0]['tasks'][i];
        document.getElementById('awaitFeedbackTasks').innerHTML += generateTodoHTML(element, currentUserInfo);
    }
}


function swapDone() {
    let addedDone = mainUserInfos[0]['tasks'].filter(t => t['box'] == 'doneFeedbackTasks');
    document.getElementById('doneTasks').innerHTML = '';
    for (let i = 0; i < addedDone.length; i++) {
        const element = addedDone[i];
        let currentUserInfo = mainUserInfos[0]['tasks'][i];
        document.getElementById('doneTasks').innerHTML += generateTodoHTML(element, currentUserInfo);
    }
}


function fillTasksOnBoard(i) {
    addTitleValue(i);
    addDescriptionValue(i);
    // addDateValue(i);
    addCategoryValue(i);
    // addMembersValue(i)
    // addSubTaskValue(i);
}


// function addMembersValue(i) {
//     for (j = 0; j < mainUserInfos[0]['tasks'][i].members.length; j++) {
//         let memberFirstLetter = mainUserInfos[0]['tasks'][i].members[j].charAt(0).toUpperCase();
//         let color = getRandomColor();
//         document.getElementById(`profilsOnBoard${i}`).innerHTML +=
//             `
//         <div class="profileOnBoard" style="background-color: ${color};">${memberFirstLetter}</div>
//     `;
//     }
// }


function addTitleValue(i) {
    document.getElementById(`titleOnBoard${i}`).innerHTML = ``;
    let addTitleValue = mainUserInfos[0]['tasks'][i]['title'];
    document.getElementById(`titleOnBoard${i}`).innerHTML = `${addTitleValue}`;
}


function addDescriptionValue(i) {
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = '';
    let addDescriptionValue = mainUserInfos[0]['tasks'][i]['description'];
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = `${addDescriptionValue}`;
}


// function addDateValue(i) {
//     let addDateValue = mainUserInfos[0]['tasks']['dueDate'];
//     document.getElementById('#');
// }


function addCategoryValue(i) {
    document.getElementById(`categoryOnBoard${i}`).innerHTML = ``;
    let addCategoryValue = mainUserInfos[0]['tasks'][i]['category'];
    document.getElementById(`categoryOnBoard${i}`).innerHTML =
        `
        <button id="technicalAndUserBtn${i}">${addCategoryValue}</button>
    `
    if (addCategoryValue == 'User Story') {
        document.getElementById(`technicalAndUserBtn${i}`).classList.add('UserStoryBtn');
    }
    else {
        document.getElementById(`technicalAndUserBtn${i}`).classList.add('technicalTaskBtn');
    }
}


// function addSubTaskValue(i) {
//     document.getElementById(`subtasksOnScreen${i}`).innerHTML = '';
//     for (j = 0; j < mainUserInfos[0]['tasks'][i]['subtasks'].length; j++) {
//         let addSubTaskValue = mainUserInfos[0]['tasks'][i]['subtasks'][j];
//         document.getElementById(`subtasksOnScreen${i}`).innerHTML +=
//             `
//         <span>${addSubTaskValue}</span>
//     `;
//     }
// }


async function pushToDo(newToDo) {
    mainUserInfos[0]['tasks'].push(newToDo);
    await setItem(`${currentUserKey}`, JSON.stringify(mainUserInfos));
    updateHTML();
}


function addPriorityValue(element) {
    currentPriority = element;
    return currentPriority;
}


function fillArray() {
    let addTitleValue = addTitleToBoard();
    let addDescriptionValue = addDescriptionToBoard();
    let addDateValue = addDueDateToBoard();
    let addCategoryValue = addCategoryToBoard();
    let addSubTaskValue = addSubtasksToBoard();
    // let addMembersValue = addMembersValueToBoard();
    let newToDo = {
        id: `${nextId}`, // ACHTUNG! NEXTID BLEIBT BEI 0, MUSS ALSO ANDERS GESPEICHERT UND ITTERIERT WERDEN
        box: 'toDoTasks',
        title: `${addTitleValue}`,
        description: `${addDescriptionValue}`,
        category: `${addCategoryValue}`,
        dueDate: `${addDateValue}`,
        // members: addMembersValue,
        subtasks: addSubTaskValue,
        priority: currentPriority,
    };
    nextId++;
    pushToDo(newToDo);
    clearAddTaskFloating();
}


// function addMembersValueToBoard() {
//     let addMembers = [];

//     for (i = 0; i < contactBook.length; i++) {
//         let membersInputs = document.getElementById(`listName${i}`).innerHTML;
//         addMembers.push(membersInputs);
//     }
//     return addMembers;
// }


function addTitleToBoard() {
    let addTitleInput = document.getElementById('titleAddTaskFloating');
    if (addTitleInput) {
        return addTitleInput.value;
    } else {
        return ''; // Standardwert, falls kein Element gefunden wird
    }
}


function addDescriptionToBoard() {
    let addDescriptionInput = document.getElementById('descriptionAddTaskFloating');
    if (addDescriptionInput) {
        return addDescriptionInput.value;
    } else {
        return ''; // Standardwert, falls kein Element gefunden wird
    }
}


function addDueDateToBoard() {
    let addDueDateInput = document.getElementById('dueDateAddTaskFloating');
    if (addDueDateInput) {
        return addDueDateInput.value;
    } else {
        return ''; // Standardwert, falls kein Element gefunden wird
    }
}


function addCategoryToBoard() {
    let addCategoryInput = document.getElementById('categoryInput');
    if (addCategoryInput) {
        return addCategoryInput.value;
    } else {
        return ''; // Standardwert, falls kein Element gefunden wird
    }
}


function addSubtasksToBoard() {

    let addSubtasks = [];

    for (i = 0; i < subtaskList.children.length; i++) {

        let subtaskInputs = document.getElementById(`contactText_${i}`).innerHTML;

        addSubtasks.push(subtaskInputs);
    }
    return addSubtasks;
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(box) {
    mainUserInfos[0]['tasks'][currentDraggedElement]['box'] = box;
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


function updateProgress(i) {
    let count = 0;
    let totalTasks = mainUserInfos[0]['tasks'][i]['subtasks'].length;

    // Iteriere über alle Subtasks
    for (let j = 0; j < totalTasks; j++) {
        // Überprüfe, ob die Checkbox mit der ID `subtaskCheckbox_${i}_${j}` angeklickt ist
        if (document.getElementById(`subtaskCheckbox_${i}_${j}`).checked) {
            // Wenn die Checkbox angeklickt ist, erhöhe count um 1
            count++;
        }
    }

    // Aktualisiere den Fortschritt basierend auf der Anzahl der angeklickten Checkboxen
    let progress = (count / totalTasks) * 100;
    document.getElementById(`progress${i}`).style.width = progress + '%';
}


function togglePriority(priority) {

    if (activePriority === priority) {
        activePriority = null;
    } else {
        if (activePriority !== null) {
            document.getElementsByTagName('button')[activePriority - 1].classList.remove('active');
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
    const buttons = document.querySelectorAll('.priority-box nav');
    buttons.forEach(button => button.classList.remove('activePrio'));
}


function toggleIcon() {
    var listContactContainer = document.getElementById("listContactContainer");
    var listTechnical = document.getElementById("listTechnical");
    var icon = document.getElementById("icon");

    listTechnical.style.display = "none";

    if (
        listContactContainer.style.display === "none" ||
        listContactContainer.style.display === ""
    ) {
        listContactContainer.style.display = "block";
        icon.src = "assets/img/arrow_drop_up.png";
    } else {
        listContactContainer.style.display = "none";
        icon.src = "assets/img/arrow_drop_down.png";
    }
}


function technicalUser() {
    let technical = document.getElementById("listTechnical");
    technical.innerHTML = "";

    for (let k = 0; k < categorySet.length; k++) {
        technical.innerHTML += `<div class="select" onclick="selectCategory('${categorySet[k]}')">${categorySet[k]}</div>`;
    }
}


function valueSubtask()    {
    let valueSubtask = document.getElementById('subTaskInput').value;
    document.getElementById('subtaskList').innerHTML += `${valueSubtask}`;
}


function selectCategory(category) {
    var categoryInput = document.querySelector(".categoryHeader input");
    categoryInput.value = category;
    toggleCategory();
    selectedCategories.push(category);
    categoryInput.value = selectedCategories.join(", ");
  }