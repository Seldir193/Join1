toDo = [];
inProgress = [];
awaitFeedback = [];
done = [];



function onload() {
    includeHTML();
    render();
}


function render() {
    for (i = 0; i < 1; i++) {
        //renderTasks(i);
        renderAddTask(i);
    }
}


function renderTasks() {

    document.getElementById('body').innerHTML =
        `
        <div class="newTaskFloating dNone" id="newTaskFloating">
            <div class="userStoryBtnContainer">
                <button class="userStoryBtn">User Story</button>
                <img src="assets/img/close.svg" alt="close icon" class="closeBtn">
            </div>
            <h1 id="headlineTasks${i}">Hier steht die Überschrift</h1>
            <span>Hier wird eine kleine Beschreibung der Aufgaben stehen</span>
            <table>
                <tr>
                    <th>Due Date:</th>
                    <td>99/99/2099</td>
                </tr>
                <tr>
                    <th>Priority:</th>
                    <td>Medium <img src"assets/img/medium.svg" alt="priority img"></td>
                </tr>
            </table>
            <h3>Assigned To:</h3>
                    <div class="alignItems">
                        <img src="assets/img/ellipse_profil.svg" alt="Profil Img">
                        <span>mohammed Ali</span>
                    </div>
            <h3>Subtasks:</h3>
            <label for="checkboxSubtasks1" class="styleCheckboxContainer">
                <input type="checkbox" id="checkbox2" name="checkbox2">Checkbox for a Subtasks
            </label>
        </div>
        `;
}


function showAddTaskFloating() {
    document.getElementById('newTaskFloating').classList.remove('dNone');
}

function renderAddTask(){
    document.getElementById('body').innerHTML =
`
    <div class="addTaskContainer">
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