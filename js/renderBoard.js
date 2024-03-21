function renderShowTask() {

    let addCategoryInput = mainUserInfos[0]['tasks'][i]['category'];

    let addTitleInput = mainUserInfos[0]['tasks'][i]['title'];

    let addDescriptionInput = mainUserInfos[0]['tasks'][i]['description'];

    let addDateInput = mainUserInfos[0]['tasks'][i]['dueDate'];

    let addPriorityInput = mainUserInfos[0]['tasks'][i]['priority'];

    let addMembersInput = mainUserInfos[0]['tasks'][i]['members'];

    let addSubtasksInput = mainUserInfos[0]['tasks'][i]['subtasks'];


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
                    <td id="priorityValue${i}">${addPriorityInput}<img src"assets/img/medium.svg" alt="priority img"></td>
                </tr>
            </table>
            <h3>Assigned To:</h3>
                    <div class="alignItems">
                        <img src="assets/img/ellipse_profil.svg" alt="Profil Img">
                        <span id="profilValue${i}">${addMembersInput}</span>
                    </div>
            <h3>Subtasks:</h3>
            <label for="checkboxSubtasks1" class="styleCheckboxContainer" id="subtaskValue${i}">
                <input type="checkbox" id="checkbox2" name="checkbox2">${addSubtasksInput}
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
                    <div id="listContactContainerBoard"></div>
                       <input type="text" id="assignedInput" placeholder="Select contacts to assign..." onfocus="renderAlphabeticalCategories()"  onclick="renderAlphabeticalCategories()" readonly>
                       <img id="icon" onclick=" toggleIcon()" src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                       
                    </div>
                </nav>
                <div class="categoryHeader">
                   <div class="styleCategory"><b>Category</b></div>
                      <div class="input-with-icon">
                         <input type="text" id="categoryInput" placeholder="Select task category..." onfocus="technicalUser()" onclick="technicalUser()" readonly>
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
            </form>
    </div>`;
}


// function renderContactsInAddTask() {
//     for (i = 0; i < mainUserInfos[0]['contactBook'].length; i++) {
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


function generateTodoHTML(element, currentUserInfo) {
    let category = currentUserInfo['category'];
    let title = currentUserInfo['title'];
    let description = currentUserInfo['description'];
    let priority = currentUserInfo['priority']


    return `
        <div class="tasksOnBoard" onclick="renderTaskFloating(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})">
            <div id="categoryOnBoard${element['id']}" class="categoryOnBoard">${category}</div>
            <span id="titleOnBoard${element['id']}" class="titleOnBoard">${title}</span>
            <span id="descriptionOnBoard${element['id']}" class="descriptionOnBoard">${description}</span>
            <div>
                <div class="progress-bar" id="progress-bar${element['id']}">
                    <div class="progress" id="progress${element['id']}"></div>
                    <span id="progressInText${element['id']}"></span>
                </div>
            </div>  
            <div>
                <div class="profilsOnBoard" id="profilsOnBoard${element['id']}"></div>
                <div id="priorityOnBoard${element['id']}">${priority}</div>
            </div>
        </div>
        `;
}


function renderTaskFloating(i) {

    let addCategoryInput = mainUserInfos[0]['tasks'][i]['category'];

    let addTitleInput = mainUserInfos[0]['tasks'][i]['title'];

    let addDescriptionInput = mainUserInfos[0]['tasks'][i]['description'];

    let addDateInput = mainUserInfos[0]['tasks'][i]['dueDate'];

    let addPriorityInput = mainUserInfos[0]['tasks'][i]['priority'];

    let addMembersInput = mainUserInfos[0]['tasks'][i]['members'];

    let addSubtasksInput = mainUserInfos[0]['tasks'][i]['subtasks'];

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
                 <th rowspan="2" class="styleDueDate">Due Date:</th>
                 <th rowspan="2" class="stylePriority">Priority:</th>
             </tr>
             <tr>
                 <th id="insertDueDateOverBoard${i}">${addDateInput}</th>
                 <th id="insertPriorityOverBoard${i}">${addPriorityInput}</th>
             </tr>
         </table>
         <div>
             <span class="styleAssigned">Assigned to:</span>
             <div>
                 <img src="assets/img/Profile badge.png" alt="#"
                 ${addMembersInput}
             </div>
         </div>
         <div>
             <span class="styleSubtasks" >Subtasks</span>
             <div id="checkBoxContainer${i}"></div>
             
             
         </div>
     </div>
     `;
}








function renderCheckboxs(i) {
    let subtasksCheck = mainUserInfos[0]['tasks'][i]['subtasks'];
    for (j = 0; j < subtasksCheck.length; j++) {
        document.getElementById(`checkBoxContainer${i}`).innerHTML +=
            `
    <label for="checkbox1"><input type="checkbox" id="checkboxContact${i}" name="checkbox1">${subtasksCheck[j]}</label>
    `;
    }
}