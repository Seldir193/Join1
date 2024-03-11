let currentDraggedElement;

let countToDo = [];
let countInProgress = [];
let countAwaitFeedback = [];
let countDone = [];

toDos = [{ 
    id: 1,
    title: 'testtitel',
    description: 'testbeschreibung',
    category: 'testkategorie',
    dueDate: 'testdate',
    subtasks: ['subtask1','Subtask2'],
}];


function onload() {
    includeHTML();
    render();
}


function render() {
    for (i = 0; i < 1; i++) {
        //renderShowTask(i);
        renderAddTask(i);
        renderNoTasks();
    }
}


async function pushTask(){
 //  toDos.push(id des values) //immer 
    await setItem('tasks', JSON.stringify(toDos));
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


function showAddTaskFloating() {
    let addTaskFloating = document.getElementById('addTaskFloating');
}


function toggleCard() {
    let card = document.getElementById('addTaskFloating');
    card.classList.toggle('active');
}


function renderAddTask() {
    document.getElementById('boardsContainer').innerHTML +=
        `
    <div class="addTaskContainer" id="addTaskFloating" class="addTaskFloating">
        <h1>Add Task</h1>    
        <form action="submit_task.php" method="POST">
            <input type="text" id="titleAddTaskFloating" name="title" placeholder="Enter a title" required><br>
        
            <label for="descriptionTextareaAddTask"><span id="descriptionTitelAddTask">Description <span id="optionalDescriptionTitelAddTask">(optional)</span></span></label><br>
            <textarea id="descriptionTextareaAddTask" name="description" rows="4" cols="50" placeholder="Enter a Description" required></textarea><br>
        
            <label for="dueDate">Due date</label><br>
            <input type="date" id="dueDate" name="due_date"><br>
        
            <nav class="priority">
                        <nav class="priority-header">Priority</nav>
                        <nav class="priority-box">
                            <nav class="urgent">Urgent<img src="assets/img/Prio alta.png"></nav>
                            <nav class="medium">Medium <img src="assets/img/Prio media.png"></nav>
                            <nav class="low">Low<img src="assets/img/Prio baja.png"></nav>
                        </nav>
                    </nav>
                    <nav class="assigned">
                        <nav class="assigned-box"><b>Assigned to</b> (optional)</nav>
                        <div class="input-with-icon">
                            <input type="text" id="contactInput" placeholder="Select contacts to assign...">
                            <img id="icon" onclick="toggleIcon()" src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                        </div>
                        <div class="contact-dropdown" id="contactDropdown"></div>
                    </nav>
                    <nav class="category">
                        <nav class="assigned-box"><b>Category</b></nav>
                        <div class="input-with-icon">
                            <input type="text" id="contactInput" placeholder="Select task category...">
                            <img src="assets/img/arrow_drop_down.png" class="dropdown-icon">
                        </div>
                        <div class="contact-dropdown" id="contactDropdown"></div>
                    </nav>
                    <nav class="subtasks">
                        <nav class="assigned-box"><b>Subtasks</b> (optional)</nav>
                        <div class="input-with-icon">
                            <input type="text" id="contactInput" placeholder="Add new subtask...">
                            <img src="assets/img/Subtask's icons.png" class="dropdown-icon">
                            
                        </div>
                        <div class="contact-dropdown" id="contactDropdown"></div>
                        <nav class="footer-box"></nav>
                    </nav>
            </div>
        
        </form>  
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
    wapDone();
}


function swapToDo() {
    let addedToDo = toDos.filter(t => t['category'] == 'addedToDo');
    document.getElementById('toDoTasks').innerHTML = '';
    for (let i = 0; i < addedToDo.length; i++) {
        const element = addedToDo[i];
        document.getElementById('toDoTasks').innerHTML += generateToDoHtml(element);
    }
}


function generateToDoHtml(element) {
    document.getElementById('toDoTasks').innerHTML +=
        `
<div draggable="true" ondragstart="startDragging(${element['id']})">
    <div></div>
    <span></span>
    <span></span>
    <div>
        <span></span>
        <div></div>
    </div>  
    <div>
        <div></div>
        <div></div>
    </div>
</div>
`;
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
}