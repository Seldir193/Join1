let currentDraggedElement;

let countToDo = [];
let countInProgress = [];
let countAwaitFeedback = [];
let countDone = [];

let toDos = [];

let nextId = 0;

function onload() {
    includeHTML();
    render();
}


function render() {
    for (i = 0; i < 1; i++) {
        renderShowTask();
        updateHTML();
        // renderTasksOnBoard();
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


function renderAddTaskFloating() {
    document.getElementById('boardsContainer').innerHTML +=
        `
    <div class="addTaskContainer" id="addTaskFloating" class="addTaskFloating">
        <h1>Add Task</h1>    
            <input type="text" id="titleAddTaskFloating" name="title" placeholder="Enter a title" required><br>
        
            <label for="descriptionTextareaAddTask"><span id="descriptionTitleAddTask">Description <span id="optionalDescriptionTitleAddTask">(optional)</span></span></label><br>
            <textarea id="descriptionAddTaskFloating" name="description" rows="4" cols="50" placeholder="Enter a Description" required></textarea><br>
        
            <label for="dueDate">Due date</label><br>
            <input type="date" id="dueDateAddTaskFloating" name="due_date"><br>
        
            <div class="priority">
                        <div class="priority-header">Priority</div>
                        <div class="priority-box">
                            <div class="urgent">Urgent<img src="assets/img/Prio alta.png"></div>
                            <div class="medium">Medium <img src="assets/img/Prio media.png"></div>
                            <div class="low">Low<img src="assets/img/Prio baja.png"></div>
                        </div>
                    </div>
                    

                <div class="assigned">
                  <div class="assigned-box"><b>Assigned to</b> (optional)</div>
                    <div class="input-with-icon">
                       <input type="text" id="assignedInput" placeholder="Select contacts to assign..."  onclick="renderAlphabeticalCategories()" readonly>
                       <img id="icon" onclick=" toggleIcon()" src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                       <div id="listContactContainer"></div>
                    </div>
                </div>
                <div class="categoryHeader">
                   <div class="assigned-box"><b>Category</b></div>
                      <div class="input-with-icon">
                         <input type="text" id="categoryInput" placeholder="Select task category..." onfocus="technicalUser()" onclick="technicalUser()" readonly>
                         <img id="categoryDropdown" onclick="toggleCategory()"src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                        <div id="listTechnical" class="techUser"></div>
                      </div>
                </div>
                <div class="subtasks">
                   <div class="assigned-box"><b>Subtasks</b> (optional)</div>
                     <div class="input-with-icon">
                        <input type="text" placeholder="Add new subtask..." id="subTaskInput">
                        <img id="subTask" onclick="subCurrentContact()" src="assets/img/Subtask's icons.png" class="dropdown-icon">
                     </div>
                     <div id="contactList"></div>
                     <div class="footer-box"></div>
                </div>
                <div class="button-container">
                   <div class="button-box">
                        <div class="clear-button">
                            <button class="clear" onclick="clearAddTaskFloating()">Clear <img src="assets/img/iconoir_cancel.png"></button>
                        </div>
                     <div class="create-button">
                        <button class="create" onclick="fillArray()">Create Task <img src="assets/img/check.png"></button>
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

    // for (i = 0; i < toDos.length; i++) {
    //     renderTasksOnBoard(i);
    // }
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
        <div draggable="true" ondragstart="startDragging(${element['id']})">
            <div id="categoryOnBoard${element['id']}" class="categoryOnBoard"></div>
            <span id="titleOnBoard${element['id']}" class="titleOnBoard"></span>
            <span id="descriptionOnBoard${element['id']}" class="descriptionOnBoard"></span>
            <div>
                <span></span>
                <div id="subtasksOnBoard${element['id']}" class="subtasksOnBoard"></div>
            </div>  
            <div>
                <div id="profilsOnBoard${element['id']}"></div>
                <div id="priorityOnBoard${element['id']}"></div>
            </div>
        </div>
    `;

}

 function renderTasksOnBoard() {
     document.getElementById('toDoTasks').innerHTML = '';
     for (i = 0; i < toDos.length; i++) {
         document.getElementById('toDoTasks').innerHTML +=
             `
         <div draggable="true" ondragstart="startDragging(${i})">
             <div id="categoryOnBoard${i}" class="categoryOnBoard"></div>
             <span id="titleOnBoard${i}" class="titleOnBoard"></span>
             <span id="descriptionOnBoard${i}" class="descriptionOnBoard"></span>
             <div>
                 <span></span>
                 <div id="subtasksOnBoard${i}" class="subtasksOnBoard"></div>
             </div>  
             <div>
                 <div id="profilsOnBoard${i}"></div>
                 <div id="priorityOnBoard${i}"></div>
             </div>
         </div>
     `;
         fillTasksOnBoard(i);
     }
 }


function fillTasksOnBoard(i) {
    addTitleValue(i);
    addDescriptionValue(i);
    addDateValue(i);
    addCategoryValue(i);
    addSubTaskValue(i);
}

function addTitleValue(i) {
    document.getElementById(`titleOnBoard${i}`).innerHTML = ``;
    let addTitleValue = toDos[i]['title'];
    document.getElementById(`titleOnBoard${i}`).innerHTML = `${addTitleValue}`;
}


function addDescriptionValue(i) {
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = '';
    let addDescriptionValue = toDos[i]['description'][0];
    document.getElementById(`descriptionOnBoard${i}`).innerHTML = `${addDescriptionValue}`;
}


function addDateValue(i) {
    let addDateValue = toDos[i]['dueDate'][0];
    document.getElementById('#');
}


function addCategoryValue(i) {
    document.getElementById(`categoryOnBoard${i}`).innerHTML = ``;
    let addCategoryValue = toDos[i]['category'][0];
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


function addSubTaskValue(i) {
    document.getElementById(`subtasksOnBoard${i}`).innerHTML = '';
    for (j = 0; j < toDos[i]['subtasks'].length; j++) {
        let addSubTaskValue = toDos[i]['subtasks'][j];
        document.getElementById(`subtasksOnBoard${i}`).innerHTML +=
            `
        <span>${addSubTaskValue}</span>
    `;
    }
}


function pushToDo(newToDo) {
    toDos.push(newToDo);
    // await setItem('tasks', JSON.stringify(toDos));    
    updateHTML()
}


function fillArray() {
    let addTitleValue = addTitleToBoard();
    let addDescriptionValue = addDescriptionToBoard();
    let addDateValue = addDueDateToBoard();
    let addCategoryValue = addCategoryToBoard();
    let addSubTaskValue = addSubtasksToBoard();
    let newToDo = {
        id: `${nextId}`,
        box: 'toDoTasks',
        title: `${addTitleValue}`,
        description: `${addDescriptionValue}`,
        category: `${addCategoryValue}`,
        dueDate: `${addDateValue}`,
        subtasks: addSubTaskValue,
    };
    nextId++;
    pushToDo(newToDo);
    clearAddTaskFloating();
}


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
    let subtaskInputs = document.getElementById('subTaskInput').value;
    let addSubtasks = [];
    addSubtasks.push(subtaskInputs);
    return addSubtasks;
}





function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


// function moveTo(category) {
//     todos[currentDraggedElement]['category'] = category;
// }


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