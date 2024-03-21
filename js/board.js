let currentDraggedElement;

let countToDo = [];
let countInProgress = [];
let countAwaitFeedback = [];
let countDone = [];
let letterArray = [];
let currentPriority;
let initialColorMap = {};
let randomColorCollection = {};


let categorySet = ["Technical Task", "User Story"];

let nextId = 0;

var activePriority = null;

async function onload() {
    await init();
    includeHTML();
    render();
    renderContacts();
}


function render() {
    renderAddTaskFloating();
    renderNoTasks();
    if (mainUserInfos[0]['tasks'].length > 0) {
        for (i = 0; mainUserInfos[0]['tasks'].length; i++) {
            renderShowTask(i);
        }
    }
    renderContactsOnBoard();
    updateHTML();
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
        updateProgress(i);
        progress(i);
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
    renderContactsAddTaskBoard();
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
    let addDoneValue = addDoneToBoard();
    // let addMembersValue = addMembersValueToBoard();
    let newToDo = {
        id: `${nextId}`, // ACHTUNG! NEXTID BLEIBT BEI 0, MUSS ALSO ANDERS GESPEICHERT UND ITTERIERT WERDEN
        box: 'toDoTasks',
        title: `${addTitleValue}`,
        description: `${addDescriptionValue}`,
        category: `${addCategoryValue}`,
        dueDate: `${addDateValue}`,
        members: addMembersValue,
        subtasks: addSubTaskValue,
        done: addDoneValue,
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


function addDoneToBoard() {
    let addDone = [];
    return addDone;
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
        technical.innerHTML += `<div class="select" onclick="selectCategory('${categorySet[k]}')">${categorySet[k]}</div>`;
    }
}


function valueSubtask() {
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


function showContacts() {
    document.getElementById('listContactContainerBoard').classList.remove('dNone');
}


function progress(i) {
    if (mainUserInfos[0]['tasks'][i]['done'].length > 0) {
        let progress = mainUserInfos[0]['tasks'][i]['done'].length;
        let goal = mainUserInfos[0]['tasks'][i]['subtasks'].length;

        document.querySelector('.progress').style.width = ((progress / goal) * 100) + '%';
    }
}

function updateProgress(i) {
    var checkbox = document.getElementById(`checkboxContact${i}`);

    if (!checkbox.checked) {
        let doneCount = 0;
        mainUserInfos[0]['tasks'][i]['done'].pop(doneCount);
    } else {
        let doneCount = 0;
        mainUserInfos[0]['tasks'][i]['done'].push(doneCount);
    }
}


