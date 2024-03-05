toDo = [];
inProgress = [];
awaitFeedback = [];
done = [];



function onload() {
    includeHTML();
    //render();
}


function render() {
    for (i = 0; i < 1; i++) {
        renderTasks(i);
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