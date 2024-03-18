let currentDraggedElement;

let countToDo = [];
let countInProgress = [];
let countAwaitFeedback = [];
let countDone = [];

let toDos = [];

let nextId = 0;

var activePriority = null;

async function onload() {
    await init();
    includeHTML();
    render();
    load();
}


function render() {
    for (i = 0; i < 1; i++) {
        renderShowTask();
        updateHTML();
        renderAddTaskFloating();
        renderNoTasks();
    }
}





function renderShowTask() {

    document.getElementById('boardsContainer').innerHTML +=
        `
        <div class="newTaskFloating dNone" id="newTaskFloating${i}">
            <div class="userStoryBtnContainer">
                <button class="userStoryBtn">User Story</button>
                <img src="assets/img/close.svg" alt="close icon" class="closeBtn">
            </div>
            <h1 id="headlineValue${i}">Hier steht die Überschrift</h1>
            <span id="descriptionValue${i}">Hier wird eine kleine Beschreibung der Aufgaben stehen</span>
            <table>
                <tr>
                    <th>Due Date:</th>
                    <td id="dateValue${i}">99/99/2099</td>
                </tr>
                <tr>
                    <th>Priority:</th>
                    <td id="priorityValue${i}">Medium <img src"assets/img/medium.svg" alt="priority img"></td>
                </tr>
            </table>
            <h3>Assigned To:</h3>
                    <div class="alignItems">
                        <img src="assets/img/ellipse_profil.svg" alt="Profil Img">
                        <span id="profilValue${i}">mohammed Ali</span>
                    </div>
            <h3>Subtasks:</h3>
            <label for="checkboxSubtasks1" class="styleCheckboxContainer" id="subtaskValue${i}">
                <input type="checkbox" id="checkbox2" name="checkbox2">Checkbox for a Subtasks
            </label>
        </div>
        `;
}


function toggleCard() {
    let card = document.getElementById('addTaskFloating');
    card.classList.toggle('active');
}


function toggleCardFromBoard() {
    let card = document.getElementById(`tasksOverBoardContainer${i}`);
    card.classList.toggle('active');
}


function renderAddTaskFloating() {
    document.getElementById('boardsContainer').innerHTML +=
        `
    <div class="addTaskContainer" id="addTaskFloating" class="addTaskFloating">
        <div class="closeBtnContainer">
            <img src="assets/img/close.svg" alt="close img" onclick="toggleCard()">
        </div>
        <h1>Add Task</h1>    
            <input type="text" id="titleAddTaskFloating" name="title" placeholder="Enter a title" required><br>
        
            <label for="descriptionTextareaAddTask" class="styleDescription"><span id="descriptionTitleAddTask">Description <span id="optionalDescriptionTitleAddTask">(optional)</span></span></label><br>
            <textarea id="descriptionAddTaskFloating" name="description" rows="4" cols="50" placeholder="Enter a Description" required></textarea><br>
        
            <label class="styleDueDate" for="dueDate">Due date</label><br>
            <input type="date" id="dueDateAddTaskFloating" name="due_date" ><br>
        
            <div class="StylePriority">
                        <div class="priority-header">Priority</div>
                        <div class="priority-box">
                            <div onclick="togglePriority(1)" class="urgent">Urgent<img src="assets/img/Prio alta.png"></div>
                            <div onclick="togglePriority(2)" class="medium">Medium <img src="assets/img/Prio media.png"></div>
                            <div onclick="togglePriority(3)" class="low">Low<img src="assets/img/Prio baja.png"></div>
                        </div>
                    </div>
                <div class="assigned">
                  <div class="styleAssigned"><b>Assigned to</b> (optional)</div>
                    <div class="input-with-icon">
                       <input type="text" id="assignedInput" placeholder="Select contacts to assign..." readonly>
                       <img id="icon" onclick="toggleIcon()" src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                       <div id="listContactContainer"></div>
                    </div>
                </div>
                <div class="categoryHeader">
                   <div class="styleCategory"><b>Category</b></div>
                      <div class="input-with-icon">
                         <input type="text" id="categoryInput" placeholder="Select task category..." onfocus="technicalUser()" onclick="technicalUser()" readonly>
                         <img id="categoryDropdown" onclick="toggleCategory()"src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                        <div id="listTechnical" class="techUser"></div>
                      </div>
                </div>
                <div class="subtasks">
                   <div class="styleSubtasks"><b>Subtasks</b> (optional)</div>
                     <div class="input-with-icon">
                        <input type="text" placeholder="Add new subtask..." id="subTaskInput">
                        <img id="subTask" onclick="subCurrentContact(), addSubtasksToBoard()" src="assets/img/Subtask's icons.png" class="dropdown-icon">
                     </div>
                     <div id="contactList"></div>
                     <div class="footer-box"></div>
                </div>
                <div class="button-container">
                   <div class="button-box">
                        <div class="clear-button">
                            <button class="clear" onclick="clearAddTaskFloating(), togglePriority(activePriority)">Clear <img src="assets/img/iconoir_cancel.png"></button>
                        </div>
                     <div class="create-button">
                        <button class="create" onclick="fillArray(), togglePriority(activePriority)">Create Task <img src="assets/img/check.png"></button>
                     </div>
                   </div>
               </div>   
            </div>
    </div>`;
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


function checkNoTasksToDo() {
    if (countToDo == 0) {
        document.getElementById('toDoTasks').innerHTML +=
            `
        <div class="noTasks">No tasks To Do</div>
    `;
    }
}


function checkNoTasksInProgress() {
    if (countInProgress == 0) {
        document.getElementById('inProgressTasks').innerHTML +=
            `
        <div class="noTasks">No tasks To Do</div>
    `;
    }
}


function checkNoTasksAwaitFeedback() {
    if (countAwaitFeedback == 0) {
        document.getElementById('awaitFeedbackTasks').innerHTML +=
            `
        <div class="noTasks">No tasks To Do</div>
    `;
    }
}


function checkNoTasksDone() {
    if (countDone == 0) {
        document.getElementById('doneTasks').innerHTML +=
            `
        <div class="noTasks">No tasks To Do</div>
    `;
    }
}


function updateHTML() {
    swapToDo();
    swapInProgress();
    swapAwaitFeedback();
    swapDone();
    for (i = 0; i < toDos.length; i++) {
        fillTasksOnBoard(i);
    }
}


function swapToDo() {
    let addedToDo = toDos.filter(t => t['box'] == 'toDoTasks');
    document.getElementById('toDoTasks').innerHTML = '';
    for (let i = 0; i < addedToDo.length; i++) {
        const element = addedToDo[i];
        document.getElementById('toDoTasks').innerHTML += generateTodoHTML(element);
    }
}


function swapInProgress() {
    let addedInProgress = toDos.filter(t => t['box'] == 'inProgressTasks');
    document.getElementById('inProgressTasks').innerHTML = '';
    for (let i = 0; i < addedInProgress.length; i++) {
        const element = addedInProgress[i];
        document.getElementById('inProgressTasks').innerHTML += generateTodoHTML(element);
    }
}


function swapAwaitFeedback() {
    let addedAwaitFeedback = toDos.filter(t => t['box'] == 'awaitFeedbackTasks');
    document.getElementById('awaitFeedbackTasks').innerHTML = '';
    for (let i = 0; i < addedAwaitFeedback.length; i++) {
        const element = addedAwaitFeedback[i];
        document.getElementById('awaitFeedbackTasks').innerHTML += generateTodoHTML(element);
    }
}


function swapDone() {
    let addedDone = toDos.filter(t => t['box'] == 'doneFeedbackTasks');
    document.getElementById('doneTasks').innerHTML = '';
    for (let i = 0; i < addedDone.length; i++) {
        const element = addedDone[i];
        document.getElementById('doneTasks').innerHTML += generateTodoHTML(element);
    }
}

function generateTodoHTML(element) {
    return `
        <div class="tasksOnBoard" onclick="renderTaskFloating(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})">
            <div id="categoryOnBoard${element['id']}" class="categoryOnBoard"></div>
            <span id="titleOnBoard${element['id']}" class="titleOnBoard"></span>
            <span id="descriptionOnBoard${element['id']}" class="descriptionOnBoard"></span>
            <div>
                <div class="progress-bar" id="progress-bar${element['id']}">
                    <div class="progress" id="progress${element['id']}"></div>
                    <span id="progressInText${element['id']}"></span>
                </div>
            </div>  
            <div>
                <div class="profilsOnBoard" id="profilsOnBoard${element['id']}"></div>
                <div id="priorityOnBoard${element['id']}"></div>
            </div>
        </div>
        `;
}


function fillTasksOnBoard(i) {
    addTitleValue(i);
    addDescriptionValue(i);
    addDateValue(i);
    addCategoryValue(i);
    addMembersValue(i)
    // addSubTaskValue(i);
}

function addMembersValue(i) {
    for (j = 0; j < toDos[i].members.length; j++){
    let memberFirstLetter = toDos[i].members[j].charAt(0).toUpperCase();
    let color = getRandomColor();
    document.getElementById(`profilsOnBoard${i}`).innerHTML += 
    `
        <div class="profileOnBoard" style="background-color: ${color};">${memberFirstLetter}</div>
    `;
}}



function addTitleValue(i) {
    document.getElementById(`titleOnBoard${i}`).innerHTML = ``;
    let addTitleValue = toDos[i]['title'];
    document.getElementById(`titleOnBoard${i}`).innerHTML = `${addTitleValue}`;
}


function addDescriptionValue(i) {
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = '';
    let addDescriptionValue = toDos[i]['description'];
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = `${addDescriptionValue}`;
}


function addDateValue(i) {
    let addDateValue = toDos[i]['dueDate'];
    document.getElementById('#');
}


function addCategoryValue(i) {
    document.getElementById(`categoryOnBoard${i}`).innerHTML = ``;
    let addCategoryValue = toDos[i]['category'];
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
//     for (j = 0; j < toDos[i]['subtasks'].length; j++) {
//         let addSubTaskValue = toDos[i]['subtasks'][j];
//         document.getElementById(`subtasksOnScreen${i}`).innerHTML +=
//             `
//         <span>${addSubTaskValue}</span>
//     `;
//     }
// }


async function pushToDo(newToDo) {
    toDos.push(newToDo);
    await setItem('tasks', JSON.stringify(toDos));    
    updateHTML();
}


function fillArray() {
    let addTitleValue = addTitleToBoard();
    let addDescriptionValue = addDescriptionToBoard();
    let addDateValue = addDueDateToBoard();
    let addCategoryValue = addCategoryToBoard();
    let addSubTaskValue = addSubtasksToBoard();
    // let addMembersValue = addMembersValueToBoard();
    let newToDo = {
        id: `${nextId}`,
        box: 'toDoTasks',
        title: `${addTitleValue}`,
        description: `${addDescriptionValue}`,
        category: `${addCategoryValue}`,
        dueDate: `${addDateValue}`,
        // members: addMembersValue,
        subtasks: addSubTaskValue,
    };
    nextId++;
    pushToDo(newToDo);
    clearAddTaskFloating();
    clearMembersSubtasks();
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

    for (i = 0; i < contactList.children.length; i++) {

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
    toDos[currentDraggedElement]['box'] = box;
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
    let totalTasks = toDos[i]['subtasks'].length;

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


function renderTaskFloating(i) {

   document.getElementById('taskBoard').innerHTML =
   `
    <div class="tasksOverBoardContainer" id="tasksOverBoardContainer${i}">
        <div class="categoryContainerOverBoard">
            <button class="technicalTaskBtn" id="technicalTaskBtnOverBoard${i}"></button>
            <img src="assets/img/close.svg" alt="close img">
        </div>
        <h1 class="titelOverBoard"></h1>
        <span class="descriptionOverBoard"></span>
        <table>
            <tr>
                <th rowspan="2" class="styleDueDate">Due Date:</th>
                <th rowspan="2" class="stylePriority">Priority:</th>
            </tr>
            <tr>
                <th id="insertDueDateOverBoard${i}"></th>
                <th id="insertPriorityOverBoard${i}"></th>
            </tr>
        </table>
        <div>
            <span class="styleAssigned">Assigned to:</span>
            <div>
                <img src="assets/img/Profile badge.png" alt="#"
            
            </div>
        </div>
        <div>
            <span class="styleSubtasks">Subtasks</span>
            <label for="checkbox1"><input type="checkbox" id="checkbox${i}" name="checkbox1">Subtask 1</label>
            <label for="checkbox2"><input type="checkbox" id="checkbox${i}" name="checkbox2">Subtask 2</label>
        </div>
    </div>
    `;
}


// // function renderAlphabeticalCategoriesOnBoard() {
// //     for (let j = 0; j < contactBook.length; j++) {
// //       let letter = contactBook[j].name.charAt(0).toUpperCase();
// //       if (!letterArray.includes(letter)) {
// //         letterArray.push(letter);
// //       }
// //     }
// //     let contacts = document.getElementById("listContactContainerBoard");
// //     contacts.innerHTML = "";
// //     letterArray = letterArray.slice().sort();
  
// //     for (let n = 0; n < letterArray.length; n++) {
// //       contacts.innerHTML += `<div id="${letterArray[n]}"  class="category"><div class="letter">${letterArray[n]}</div><div class="line"></div></div>`;
// //     }
// //    <>
// //   }
  
//   function renderContactsOnBoard() {
//     let letter = contactBook[i].name.charAt(0).toUpperCase();
//       let contacts = document.getElementById(letter);
//       contacts.innerHTML = '';
//     for (let i = 0; i < contactBook.length; i++) {
//       let letter = contactBook[i].name.charAt(0).toUpperCase();
//       let contacts = document.getElementById(letter);
//       let randomColor = getRandomColor();
//       randomColorCollection.push(randomColor);
//       let charStyle = `style="background-color: ${randomColor}"`;
//       contacts.innerHTML += `
//       <button id="contactOnBoard${i}" class="listContact">
//       <div class="chartAt" ${charStyle}>${contactBook[i].name.charAt(0)}</div>
//       <div class="renderNameEmail" >
//       <div class="listName">${contactBook[i].name} </div>
      
//       </div><input class="box" type="checkbox" id="remember" name="remember">
//      </button>`;
//     }
//   }


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