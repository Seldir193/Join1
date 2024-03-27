function renderShowTask(i) {
    if (mainUserInfos[0] && mainUserInfos[0]['tasks'] && mainUserInfos[0]['tasks'][i]) {
        if (mainUserInfos[0]['tasks'][i]['category'] !== undefined) {
            addCategoryInput = mainUserInfos[0]['tasks'][i]['category'];
        }
        if (mainUserInfos[0]['tasks'][i]['title'] !== undefined) {
            addTitleInput = mainUserInfos[0]['tasks'][i]['title'];
        }
        if (mainUserInfos[0]['tasks'][i]['description'] !== undefined) {
            addDescriptionInput = mainUserInfos[0]['tasks'][i]['description'];
        }
        if (mainUserInfos[0]['tasks'][i]['dueDate'] !== undefined) {
            addDateInput = mainUserInfos[0]['tasks'][i]['dueDate'];
        }
        if (mainUserInfos[0]['tasks'][i]['priority'] !== undefined) {
            addPriorityInput = mainUserInfos[0]['tasks'][i]['priority'];
        }
        if (mainUserInfos[0]['tasks'][i]['members'].length > 0) {
            addMembersInput = mainUserInfos[0]['tasks'][i]['members'];
        }
        if (mainUserInfos[0]['tasks'][i]['subtasks'] !== undefined) {
            for (let j = 0; j < mainUserInfos[0]['tasks'][i]['subtasks'].length; j++) {
                addSubtasksInput = mainUserInfos[0]['tasks'][i]['subtasks'][j];
            }
        }
    }
    document.getElementById('boardsContainer').innerHTML +=
        `
        <div class="newTaskFloating dNone" id="newTaskFloating${i}">
            <div class="userStoryBtnContainer">
                <button class="userStoryBtn">${addCategoryInput}</button>
                <img src="assets/img/close.svg" alt="close icon" class="closeBtn">
            </div>
            <h1 id="headlineValue${i}">${addTitleInput}</h1>
            <span id="descriptionValue${i}">${addDescriptionInput}</span>
            <table>
                <tr>
                    <th>Due Date:</th>
                    <td id="dateValue${i}">${addDateInput}</td>
                </tr>
                <tr>
                    <th>Priority:</th>
                    <td id="priorityValue${i}"><img src"assets/img/medium.svg" alt="priority img"></td>
                </tr>
            </table>
            <h3>Assigned To:</h3>
                    <div class="alignItems">
                        <img src="assets/img/ellipse_profil.svg" alt="Profil Img">
                        <span id="profilValue${i}"></span>
                    </div>
            <h3>Subtasks:</h3>
            <label for="checkboxSubtasks1" class="styleCheckboxContainer" id="subtaskValue${i}">
                <input type="checkbox" id="checkboxContainerNewTask" name="checkbox2">
            </label>
        </div>
        `;
}


function renderAddTaskFloating() {
    document.getElementById('boardsContainer').innerHTML +=
        `
    <div class="addTaskContainer" id="addTaskFloating" class="addTaskFloating">
        <div class="closeBtnContainer">
            <img src="assets/img/close.svg" alt="close img" onclick="toggleCard()">
        </div>
        <h1>Add Task</h1>
            <form id="addTaskForm">    
            <input type="text" id="titleAddTaskFloating" name="title" placeholder="Enter a title" required><br>
        
            <label for="descriptionTextareaAddTask" class="styleDescription"><span id="descriptionTitleAddTask">Description <span id="optionalDescriptionTitleAddTask">(optional)</span></span></label><br>
            <textarea id="descriptionAddTaskFloating" name="description" rows="4" cols="50" placeholder="Enter a Description" required></textarea><br>
        
            <label class="styleDueDate" for="dueDate">Due date</label><br>
            <input type="date" id="dueDateAddTaskFloating" name="due_date" ><br>
        
            <nav class="priority">
                  <nav class="priority-header">Priority</nav>
                    <nav class="priority-box">
                        <nav class="urgent" onclick="resetBackgroundColors(), toggleBackgroundColor(this), addPriorityValue('urgent')">Urgent
                            <img class="color-img" src="assets/img/Prio alta.png"><img class="gray-img" src="assets/img/Prio alta (1).png"></nav>
                        <nav class="medium"onclick="resetBackgroundColors(), toggleBackgroundColor(this), addPriorityValue('medium')" >Medium <img class="color-img" src="assets/img/Prio media (1).png">
                            <img class="gray-img" src="assets/img/Prio media.png"></nav>
                        <nav class="low" onclick="resetBackgroundColors(), toggleBackgroundColor(this), addPriorityValue('low')">Low<img class="color-img" src="assets/img/Prio baja.png">
                            <img class="gray-img" src="assets/img/Prio baja (1).png"></nav>
                    </nav>
                </nav>
                <nav class="assigned">
                  <nav class="assigned-box"><b>Assigned to</b> (optional)</nav>
                    <div class="input-with-icon">
                    
                       <input type="text" id="assignedInput" placeholder="Select contacts to assign..." readonly>
                       <img id="icon" onclick="renderContactsOnBoard()" src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                       
                    </div>
                </nav>
                <div id="listContactContainerBoard" class="dNone"></div>
                <div class="categoryHeader">
                   <div class="styleCategory"><b>Category</b></div>
                      <div class="input-with-icon">
                         <input type="text" id="categoryInput" placeholder="Select task category..." onfocus="technicalUser(), toggleCategory()" readonly required>
                         <img id="categoryDropdown" onclick="toggleCategory()"src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                      </div>
                      <div id="listTechnical" class="techUser"></div>
                </div>
                <div class="subtasks">
                   <div class="styleSubtasks"><b>Subtasks</b> (optional)</div>
                     <div class="input-with-icon">
                        <input type="text" placeholder="Add new subtask..." id="subTaskInput">
                        <img id="subTask" onclick="valueSubtask()" src="assets/img/Subtask's icons.png" class="dropdown-icon">
                     </div>
                     <div id="subtaskList"></div>
                </div>
                <div class="button-container">
                   <div class="button-box">
                        <div class="clear-button">
                            <button class="clear" onclick="clearAddTaskFloating(), togglePriority(activePriority), ClearAddMembersValueArray()">Clear <img src="assets/img/iconoir_cancel.png"></button>
                        </div>
                     <div class="create-button">
                        <button class="create" onclick="fillArray(), togglePriority(activePriority), toggleCard(), clearAddTaskFloating(), ClearAddMembersValueArray()">Create Task <img src="assets/img/check.png"></button>
                     </div>
                   </div>
               </div>   
            </div>
            </form>
    </div>`;
}


// function renderContactsInAddTask() {
//     for (let i = 0; i < mainUserInfos[0]['contactBook'].length; i++) {
//         let contact = mainUserInfos[0]['contactBook'][i];
//         document.getElementById('listContactContainerBoard').innerHTML =
//             `
//         <div>
//             <div></div>
//             <span>${contact}</span>
//             <input type="checkbox" id="addContactToBoard${i}" name="myCheckbox" value="checkboxValue">
//         </div>
//     `;
//     }
// }

function checkNoTasksToDo() {
    let anyTask = mainUserInfos[0]['tasks'].length;
    if (anyTask < 1) {
        document.getElementById('toDoTasks').innerHTML =
            `
    <div class="noTasks">No tasks To Do</div>
`;
    }
    for (let i = 0; i < mainUserInfos[0]['tasks'].length; i++) {
        let tasks = mainUserInfos[0]['tasks'][i]['box'];
        if (tasks !== 'toDoTasks') {
            document.getElementById('toDoTasks').innerHTML =
                `
        <div class="noTasks">No tasks To Do</div>
    `;
        }
    }
}


function checkNoTasksInProgress() {
    let anyTask = mainUserInfos[0]['tasks'].length;
    if (anyTask < 1) {
        document.getElementById('inProgressTasks').innerHTML =
            `
    <div class="noTasks">No tasks To Do</div>
`;
    }
    for (let i = 0; i < mainUserInfos[0]['tasks'].length; i++) {
        let tasks = mainUserInfos[0]['tasks'][i]['box'];
        if (tasks !== 'inProgressTasks') {
            document.getElementById('inProgressTasks').innerHTML =
                `
        <div class="noTasks">No tasks To Do</div>
    `;
        }
    }
}


function checkNoTasksAwaitFeedback() {
    let anyTask = mainUserInfos[0]['tasks'].length;
    if (anyTask < 1) {
        document.getElementById('awaitFeedbackTasks').innerHTML =
            `
    <div class="noTasks">No tasks To Do</div>
`;
    }
    for (let i = 0; i < mainUserInfos[0]['tasks'].length; i++) {
        let tasks = mainUserInfos[0]['tasks'][i]['box'];
        if (tasks !== 'awaitFeedbackTasks') {
            document.getElementById('awaitFeedbackTasks').innerHTML =
                `
        <div class="noTasks">No tasks To Do</div>
    `;
        }
    }
}

function checkNoTasksDone() {
    let anyTask = mainUserInfos[0]['tasks'].length;
    if (anyTask < 1) {
        document.getElementById('doneTasks').innerHTML =
            `
    <div class="noTasks">No tasks To Do</div>
`;
    }
    for (let i = 0; i < mainUserInfos[0]['tasks'].length; i++) {
        let tasks = mainUserInfos[0]['tasks'][i]['box'];
        if (tasks !== 'doneTasks') {
            document.getElementById('doneTasks').innerHTML =
                `
        <div class="noTasks">No tasks To Do</div>
    `;
        }
    }
}


function renderTaskFloating(i) {
    if (mainUserInfos[0] && mainUserInfos[0]['tasks'] && mainUserInfos[0]['tasks'][i]) {
        if (mainUserInfos[0]['tasks'][i]['category'] !== undefined) {
            addCategoryInput = mainUserInfos[0]['tasks'][i]['category'];
        }
        if (mainUserInfos[0]['tasks'][i]['title'] !== undefined) {
            addTitleInput = mainUserInfos[0]['tasks'][i]['title'];
        }
        if (mainUserInfos[0]['tasks'][i]['description'] !== undefined) {
            addDescriptionInput = mainUserInfos[0]['tasks'][i]['description'];
        }
        if (mainUserInfos[0]['tasks'][i]['dueDate'] !== undefined) {
            addDateInput = mainUserInfos[0]['tasks'][i]['dueDate'];
        }
        if (mainUserInfos[0]['tasks'][i]['priority'] !== undefined) {
            addPriorityInput = mainUserInfos[0]['tasks'][i]['priority'];
        }
        if (mainUserInfos[0]['tasks'][i]['members'] !== undefined) {
            addMembersInput = mainUserInfos[0]['tasks'][i]['members'];
        }


        document.getElementById('taskBoard').innerHTML =
            `
     <div class="tasksOverBoardContainer" id="tasksOverBoardContainer${i}">
         <div class="categoryContainerOverBoard">
             <button class="technicalTaskBtn" id="technicalTaskBtnOverBoard${i}">${addCategoryInput}</button>
             <img src="assets/img/close.svg" alt="close img">
         </div>
         <h1 class="titelOverBoard">${addTitleInput}</h1>
         <span class="descriptionOverBoard">${addDescriptionInput}</span>
         <table>
            <tr>
                <th class="styleDueDate">Due Date:</th>
                <td id="insertDueDateOverBoard${i}">${addDateInput}</td>
            </tr>
            <tr>
                <th class="stylePriority">Priority:</th>
                <td id="insertPriorityOverBoard${i}">${addPriorityInput}</td>
            </tr>
        </table>
         <div>
             <span class="styleAssigned">Assigned to:</span>
             <div id="contactsOverBoardContainer${i}">${addMembersInput}        
             </div>
         </div>
         <div>
             <span class="styleSubtasks">Subtasks</span>
             <div id="checkBoxContainer${i}" class="checkBoxContainer"></div>             
         </div>
         <div class="deleteChangeContainer">
            <img src="assets/img/delete.svg" alt="deleteBtn" onclick="deleteTask(${i})">
         </div>
     </div>
     `;
    }

    if (mainUserInfos[0]['tasks'][i]['subtasks'] !== undefined) {
        for (let j = 0; j < mainUserInfos[0]['tasks'][i]['subtasks'].length; j++) {
            let addSubtasksInput = mainUserInfos[0]['tasks'][i]['subtasks'][j];
            document.getElementById('checkBoxContainer').innerHTML +=
                `
            <div>
                <input type="checkbox" id="checkbox${j}" name="checkbox${j}" onchange="checkSubtasks(${i}, ${j})">
                <label for="checkbox${j}">${addSubtasksInput}</label>
            </div>
            `;
        }
    }
    updateCheckBoxes(i);
}


// DeleteButton, falls man ihn mal braucht <img src="assets/img/delete.svg" alt="deleteBtn" onclick="deleteTask(${element['id']})">


function generateTodoHTML(element, currentUserInfo) {
    let category = currentUserInfo['category'];
    let title = currentUserInfo['title'];
    let description = currentUserInfo['description'];
    let priority = currentUserInfo['priority'];
    let progress = element['done'].filter(item => item === true).length;
    let goal = element['subtasks'].length;
    let result = progress + '/' + goal;
    return `
        <div class="tasksOnBoard" onclick="renderTaskFloating(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})">
            <div id="categoryOnBoard${element['id']}" class="categoryOnBoard">${category}</div>
            <div class="column">
                <span id="titleOnBoard${element['id']}" class="titleOnBoard">${title}</span>
                <span id="descriptionOnBoard${element['id']}" class="descriptionOnBoard">${description}</span>
            </div>
            <div class="progressContainer">
                <div class="progress-bar" id="progress-bar${element['id']}">
                    <div class="progress" id="progress${element['id']}"></div>
                </div>
                <span id="progressInText${element['id']}" class="progressInText">${result} Subtasks</span>
            </div>  
            <div class="spaceBetween">
                <div class="profilsOnBoard" id="profilsOnBoard${element['id']}"></div>
                <div id="priorityOnBoard${element['id']}">${priority}</div>
            </div>
        </div>
        `;
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


function addDoneToBoard() {
    if (addDoneValueArray.length == 0) {
        for (let j = 0; j < addSubtasks.length; j++) {
            let firstStatus = 'false';
            addDoneValueArray.push(firstStatus);
        }
    }
}