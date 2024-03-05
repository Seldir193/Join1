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
            <div class="editContainer">
                <div class="editAddTask">
                    <img src="assets/img/delete.svg" alt="bin"><span>Delete</span>
                </div>
                <div class="seperater"></div>
                <div class="editAddTask">
                    <img src="assets/img/edit.svg" alt="pen"><span>Edit</span>
                </div>
            </div>
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
        <h1>Ass Task</h1>    
        <form action="submit_task.php" method="POST">
            <input type="text" id="titleAddTaskFloating" name="title" placeholder="Enter a title" required><br>
        
            <label for="description">Beschreibung:</label><br>
            <textarea id="description" name="description" rows="4" cols="50" required></textarea><br>
        
            <label for="due_date">Fälligkeitsdatum:</label>
            <input type="date" id="due_date" name="due_date"><br>
        
            <label>Priorität:</label><br>
            <input type="radio" id="low_priority" name="priority" value="low">
            <label for="low_priority">Niedrig</label><br>
        
            <input type="radio" id="medium_priority" name="priority" value="medium">
            <label for="medium_priority">Mittel</label><br>
        
            <input type="radio" id="high_priority" name="priority" value="high">
            <label for="high_priority">Hoch</label><br>
        
            <label for="category">Kategorie:</label>
            <select id="category" name="category">
                <option value="work">Arbeit</option>
                <option value="personal">Persönlich</option>
                <option value="other">Andere</option>
            </select><br>
        
            <label for="checkbox1">Checkbox 1:</label>
            <input type="checkbox" id="checkbox1" name="checkbox1" value="checkbox1"><br>
        
            <label for="checkbox2">Checkbox 2:</label>
            <input type="checkbox" id="checkbox2" name="checkbox2" value="checkbox2"><br>
        
            <input type="submit" value="Aufgabe hinzufügen">
        </form>  
    </div>`;
}