let theme = document.querySelector("#themeBtn");
let mode = document.querySelector(".mode");
let quote = document.querySelector("#quote");
let author = document.querySelector("#author");
let greeting = document.querySelector("#greeting");
let clock = document.querySelector("#clock");
let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let addTaskBtn = document.querySelector("#addTaskBtn");
let overlay = document.querySelector(".overlay")
let cancelBtn = document.querySelector(".cancel-btn");
let taskForm = document.querySelector("#taskForm");
let taskList = document.querySelector("#taskList");
let deleteBtn = document.querySelector(".delete-btn")
let doneBtn = document.querySelector(".done-btn")
let editBtn = document.querySelector(".edit-btn")
let taskInput = document.querySelector("#taskInput")
let priority = document.querySelector("#priority")
let dueDate = document.querySelector("#dueDate")
let totalTask = document.querySelector("#totalTask");
let completedTask = document.querySelector("#completedTask");
let pendingTask = document.querySelector("#pendingTask");
let summary = document.querySelector(".summary");
let progressFill = document.querySelector("#progressFill");
let progressText = document.querySelector("#progressText")
let goalInput = document.querySelector("#goalInput")
let saveGoalBtn = document.querySelector("#saveGoalBtn")
let savedGoal = document.querySelector("#savedGoal")
let notes = document.getElementById("notes");
let saveNotesBtn = document.getElementById("saveNotesBtn");
let savedNotes = document.getElementById("savedNotes");
let minutesInput = document.querySelector("#minutesInput");
let timer = document.querySelector("#timer");
let todoOverlay = document.querySelector(".todo-overlay");
let startBtn = document.querySelector("#startBtn");
let pauseBtn = document.querySelector("#pauseBtn");
let resetBtn = document.querySelector("#resetBtn");
let openPomodoro = document.querySelector("#openPomodoro")
let closePomodoro = document.querySelector("#closePomodoro")
let pomodoroOverlay = document.querySelector(".pomodoro-overlay");
let notesOverlay = document.querySelector(".notes-overlay");
let openNotesBtn = document.querySelector("#openNotesBtn");
let closeNotesBtn = document.querySelector("#closeNotesBtn");
let goalOverlay = document.querySelector(".goal-overlay");
let openGoalBtn = document.querySelector("#openGoalBtn");
let closeGoalBtn = document.querySelector("#closeGoalBtn");
let plannerTask = document.querySelector("#plannerTask");
let plannerStart = document.querySelector("#plannerStart");
let plannerEnd = document.querySelector("#plannerEnd");
let plannerHours = document.querySelector("#plannerHours");
let addPlannerBtn = document.querySelector("#addPlannerBtn");
let plannerList = document.querySelector("#plannerList");
let plannerOverlay = document.querySelector(".planner-overlay");
let openPlannerBtn = document.querySelector("#openPlannerBtn");
let closePlannerBtn = document.querySelector("#closePlannerBtn");

// let progressSection = document.querySelector(".progress-section");
// // progressSection.style.display = "none"


window.addEventListener("DOMContentLoaded", () => {
    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        mode.setAttribute("class", "ri-sun-fill mode");
    } else {
        document.body.classList.remove("dark-theme");
        mode.setAttribute("class", "ri-moon-fill mode");
    }
});

theme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        mode.setAttribute("class", "ri-sun-fill mode");
    } else {
        localStorage.setItem("theme", "light");
        mode.setAttribute("class", "ri-moon-fill mode");
    }
});

async function motivationalQuote() {

    try {

        let response = await fetch("https://dummyjson.com/quotes/random");

        let data = await response.json();

        quote.innerText = data.quote;
        author.innerText = `- ${data.author}`;

    } catch (error) {
        console.log(error);
        getCustomQuote();
    }

}



async function getCustomQuote() {

    let response = await fetch("quotes.json");

    let data = await response.json();

    let randomIndex = Math.floor(Math.random() * data.length);

    let randomQuote = data[randomIndex];

    quote.innerText = randomQuote.quote;
    author.innerText = `- ${randomQuote.author}`;

}



function showQuote() {

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        getCustomQuote();
    } else {
        motivationalQuote();
    }

}

showQuote();

function greet() {
    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.innerText = "Good Morning!";
    }
    else if (hour < 17) {
        greeting.innerText = "Good Afternoon!";
    }
    else if (hour < 21) {
        greeting.innerText = "Good Evening!";
    }
    else {
        greeting.innerText = "Good Night!";
    }
}

greet();

function updateDateTime() {

    const currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    clock.innerText =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    day.innerText = days[currentTime.getDay()];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    month.innerText = `${currentTime.getDate()} ${months[currentTime.getMonth()]}`;

    year.innerText = currentTime.getFullYear();

}

updateDateTime();

setInterval(updateDateTime, 1000);




addTaskBtn.addEventListener("click", () => {
    overlay.style.display = "flex";

}
)

cancelBtn.addEventListener("click", () => {
    overlay.style.display = "none";
   
    taskForm.reset()
}
)

let task = JSON.parse(localStorage.getItem("tasks")) || [];






let taskUI = function (obj) {

    return `
     <li class="task-card ${obj.completed ? "task-completed" : ""}">      

        <div class="task-top">
            <span class="priority ${obj.priority.toLowerCase()}">
                ${obj.priority}
            </span>
            <span class="status ${obj.completed ? "completed" : "pending"}">
                ${obj.completed ? "Completed" : "Pending"}
            </span>
        </div>

        <h3 class="task-title">${obj.title}</h3>

        <p class="task-desc">${obj.description}</p>

        <div class="task-info">
            <span>📅 ${obj.dueDate}</span>
        </div>


   ${!obj.completed
            ? `<button class="edit-btn" data-id="${obj.id}">
            ✏ Edit
       </button>`
            : ""
        }

${!obj.completed
            ? `<button class="done-btn" data-id="${obj.id}">
            ✔ Done
       </button>`
            : ""
        }

<button class="delete-btn" data-id="${obj.id}">
    🗑 Delete
</button>

</div >

    </li >
    `;
};

let editId = null;

function renderUI(data = task) {

    taskList.innerHTML = "";

    data.forEach((obj) => {
        taskList.innerHTML += taskUI(obj);
    });

    updateSummary();
    updateProgress();

}

renderUI()


taskForm.addEventListener("submit", (e) => {
    e.preventDefault();



    if (taskForm[0].value.trim() === "") {
        alert("Please enter a task title.");
        return;
    } else if (taskForm[1].value.trim() === "") {
        alert("Please enter a task description.");
        return;
    } else if (taskForm[3].value.trim() === "") {
        alert("Please select a due date.");
        return;
    }

    if (editId !== null) {

        let taskObj = task.find((obj) => obj.id === editId);

        taskObj.title = taskForm[0].value.trim();
        taskObj.description = taskForm[1].value.trim();
        taskObj.priority = taskForm[2].value;
        taskObj.dueDate = taskForm[3].value.trim();

        editId = null;
        taskForm.reset()

    } else {

        let obj = {
            id: Date.now(),
            title: taskForm[0].value.trim(),
            description: taskForm[1].value.trim(),
            priority: taskForm[2].value,
            dueDate: taskForm[3].value.trim(),
            completed: false
        };

        task.push(obj);

    }

    localStorage.setItem("tasks", JSON.stringify(task));




    overlay.style.display = "none";
    taskForm.reset();
    // taskUI()
    renderUI()
}
)


function deleteTask() {
    task.filter
}

taskList.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-btn")) {

        let id = Number(e.target.dataset.id);

        task = task.filter((obj) => obj.id !== id);

        localStorage.setItem("tasks", JSON.stringify(task));

        updateProgress()
        renderUI();

    }

    if (e.target.classList.contains("done-btn")) {
        let id = Number(e.target.dataset.id);

        let taskObj = task.find((obj) => {

            return obj.id === id;

        });

        taskObj.completed = true;

        localStorage.setItem("tasks", JSON.stringify(task));

        renderUI();
        updateProgress()

        console.log(taskObj.completed);



    }

    if (e.target.classList.contains("edit-btn")) {

        let id = Number(e.target.dataset.id);

        let taskObj = task.find((obj) => obj.id === id);

        editId = id;



        overlay.style.display = "flex";

        taskForm[0].value = taskObj.title;
        taskForm[1].value = taskObj.description;
        taskForm[2].value = taskObj.priority;
        taskForm[3].value = taskObj.dueDate;

    }



});

taskInput.addEventListener("input", () => {

    let search = task.filter((obj) => {
        return (
            obj.title.toLowerCase().includes(taskInput.value.toLowerCase()) ||
            obj.description.toLowerCase().includes(taskInput.value.toLowerCase())
        );
    })

    console.log(search);

    renderUI(search)



})
priority.addEventListener("change", () => {

    if (priority.value === "All") {

        renderUI();

        return;

    }

    let filterData = task.filter((obj) => {

        return obj.priority === priority.value;

    });

    renderUI(filterData);

});


dueDate.addEventListener("change", () => {

    if (dueDate.value === "") {
        renderUI();
        return;
    }

    let filterData = task.filter((obj) => {

        return obj.dueDate === dueDate.value;

    });

    renderUI(filterData);

});
function updateSummary() {

    totalTask.innerText = task.length;

    let completed = task.filter((obj) => {

        return obj.completed;

    });

    completedTask.innerText = completed.length;

    let pending = task.filter((obj) => {

        return !obj.completed;

    });

    pendingTask.innerText = pending.length;

}



summary.addEventListener("click", (e) => {

    const card = e.target.closest(".summary-card");

    if (!card) return;

    const filter = card.dataset.filter;

    if (filter === "all") {

        renderUI(task);

    }

    else if (filter === "completed") {

        let completedTask = task.filter((obj) => obj.completed);

        renderUI(completedTask);

    }

    else if (filter === "pending") {

        let pendingTask = task.filter((obj) => !obj.completed);

        renderUI(pendingTask);

    }

});

function updateProgress() {
    console.log("Progress Function Chali");
    let total = task.length;

    let completed = task.filter((obj) => obj.completed).length;

    let progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressText.innerText = progress + "%";

    progressFill.style.width = progress + "%";

}

updateProgress()






let goals = JSON.parse(localStorage.getItem("goals")) || [];



function goalUI(goal) {

    return `
        <div class="goal-item ${goal.completed ? "completed" : ""}" data-id="${goal.id}">

            <p class="goal-text">
                🎯 ${goal.text}
            </p>

            <div class="goal-actions">

                ${goal.completed
            ? ""
            : `<button class="goal-done">✔ Done</button>`
        }

                <button class="goal-delete">🗑 Delete</button>

            </div>

        </div>
    `;
}



function renderGoals() {

    savedGoal.innerHTML = "";

    goals.forEach(goal => {

        savedGoal.innerHTML += goalUI(goal);

    });

}



saveGoalBtn.addEventListener("click", () => {


    if (goalInput.value.trim() === "") {
        alert("Please fill the field");
        return;
    }


    let goalObj = {

        id: Date.now(),
        text: goalInput.value,
        completed: false

    };


    goals.push(goalObj);


    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );


    renderGoals();


    goalInput.value = "";

});




savedGoal.addEventListener("click", (e) => {


    let card = e.target.closest(".goal-item");

    if (!card) return;


    let id = Number(card.dataset.id);





    if (e.target.classList.contains("goal-delete")) {


        goals = goals.filter(goal => goal.id !== id);


        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );


        renderGoals();

    }




    if (e.target.classList.contains("goal-done")) {


        let goal = goals.find(goal => goal.id === id);


        goal.completed = true;


        localStorage.setItem(
            "goals",
            JSON.stringify(goals)
        );


        renderGoals();

    }


});




renderGoals();


let notesArr = JSON.parse(localStorage.getItem("notes")) || [];

function noteUI(note) {
    return `
        <div class="note-item" data-id="${note.id}">
            <p>${note.text}</p>

            <button class="note-delete">
                🗑 Delete
            </button>
        </div>
    `;
}


function renderNotes() {

    savedNotes.innerHTML = "";

    if (notesArr.length === 0) {
        savedNotes.innerHTML = `<p id="no">No notes yet.</p>`;
        return;
    }

    notesArr.forEach(note => {
        savedNotes.innerHTML += noteUI(note);
    });

}


saveNotesBtn.addEventListener("click", () => {

    if (notes.value.trim() === "") {
        alert("Please write a note");
        return;
    }

    let noteObj = {
        id: Date.now(),
        text: notes.value
    };

    notesArr.push(noteObj);

    localStorage.setItem("notes", JSON.stringify(notesArr));

    renderNotes();

    notes.value = "";

});


savedNotes.addEventListener("click", (e) => {

    if (e.target.classList.contains("note-delete")) {

        let id = Number(
            e.target.closest(".note-item").dataset.id
        );

        notesArr = notesArr.filter(note => note.id !== id);

        localStorage.setItem("notes", JSON.stringify(notesArr));

        renderNotes();
    }

});


renderNotes();



let timeLeft = 25 * 60;
let interval;
let isRunning = false;


function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start Timer
startBtn.addEventListener("click", () => {

    if (!isRunning) {

        // Agar user ne input diya hai aur timer start nahi hua
        if (minutesInput.value && timeLeft === 25 * 60) {
            timeLeft = Number(minutesInput.value) * 60;
            updateTimer();
        }

        isRunning = true;

        interval = setInterval(() => {

            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(interval);
                isRunning = false;
                alert("⏰ Time's Up!");
            }

        }, 1000);

    }

});

// Pause
pauseBtn.addEventListener("click", () => {

    clearInterval(interval);
    isRunning = false;

});

// Reset
resetBtn.addEventListener("click", () => {

    clearInterval(interval);
    isRunning = false;

    timeLeft = (minutesInput.value ? Number(minutesInput.value) : 25) * 60;

    updateTimer();

});


updateTimer();






openPomodoro.addEventListener("click", () => {

    pomodoroOverlay.classList.add("active");

    localStorage.setItem("activeOverlay", "timer");

});

document.getElementById("closePomodoro").addEventListener("click", () => {

    pomodoroOverlay.classList.remove("active");

    localStorage.removeItem("activeOverlay");

});

pomodoroOverlay.addEventListener("click", (e) => {

    if (e.target === pomodoroOverlay) {
        pomodoroOverlay.classList.remove("active");
    }

});


// here i done both together select and functionality 


document.querySelector("#openTodoBtn").addEventListener("click", () => {
    todoOverlay.classList.add("active");
    localStorage.setItem("activeOverlay", "todo");
});

document.querySelector("#closeTodoBtn").addEventListener("click", () => {
    todoOverlay.classList.remove("active");
    localStorage.removeItem("activeOverlay");
});

todoOverlay.addEventListener("click", (e) => {

    if (e.target === todoOverlay) {
        todoOverlay.classList.remove("active");
    }

});


openNotesBtn.addEventListener("click", () => {

    notesOverlay.classList.add("active");
    localStorage.setItem("activeOverlay", "notes");

});


closeNotesBtn.addEventListener("click", () => {

    notesOverlay.classList.remove("active");
    localStorage.removeItem("activeOverlay");

});


notesOverlay.addEventListener("click", (e) => {

    if (e.target === notesOverlay) {

        notesOverlay.classList.remove("active");

    }

});


openGoalBtn.addEventListener("click", () => {

    goalOverlay.classList.add("active");

    localStorage.setItem("activeOverlay", "goal");

});

closeGoalBtn.addEventListener("click", () => {

    goalOverlay.classList.remove("active");
    localStorage.removeItem("activeOverlay");

});


goalOverlay.addEventListener("click", (e) => {

    if (e.target === goalOverlay) {

        goalOverlay.classList.remove("active");

    }

});



let plannerArr = JSON.parse(localStorage.getItem("planner")) || [];

function savePlanner() {
    localStorage.setItem("planner", JSON.stringify(plannerArr));
}

addPlannerBtn.addEventListener("click", () => {

    const task = plannerTask.value.trim();
    const start = plannerStart.value;
    const end = plannerEnd.value;
    const duration = plannerHours.value;



    if (task === "") {
        alert("Enter Task");
        return;
    }

    if (start === "") {
        alert("Select Start Time");
        return;
    }



    if (end === "" && duration === "") {
        alert("Please fill in either the End Time or the Duration..");
        return;
    }

    const obj = {

        id: Date.now(),

        task,

        start,

        end,

        duration

    };

    plannerArr.push(obj);

    savePlanner();

    renderPlanner();

    plannerTask.value = "";
    plannerStart.value = "";
    plannerEnd.value = "";
    plannerHours.value = "";

});

renderPlanner();

function renderPlanner() {

    plannerList.innerHTML = "";

    plannerArr.forEach((obj) => {

        plannerList.innerHTML += plannerUI(obj);

    });

}

function plannerUI(obj) {

    return `

    <div class="planner-item">

        <div class="planner-info">

            <h3>${obj.task}</h3>

            <p>🕒 Start : ${obj.start}</p>

            ${obj.end
            ?
            `<p>🏁 End : ${obj.end}</p>`
            :
            ""
        }

            ${obj.duration
            ?
            `<p>⏳ Duration : ${obj.duration} Hour(s)</p>`
            :
            ""
        }

        </div>

        <div class="planner-actions">

            <button class="planner-edit" data-id="${obj.id}">
                <i class="ri-edit-line"></i>
            </button>

            <button class="planner-delete" data-id="${obj.id}">
                <i class="ri-delete-bin-line"></i>
            </button>

        </div>

    </div>

    `;

}


openPlannerBtn.addEventListener("click", () => {

    plannerOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    localStorage.setItem("activeOverlay", "planner");

});


closePlannerBtn.addEventListener("click", () => {

    plannerOverlay.style.display = "none";
    document.body.style.overflow = "auto";

    localStorage.removeItem("activeOverlay");

});

plannerOverlay.addEventListener("click", (e) => {
    if (e.target === plannerOverlay) {
        plannerOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

const menuBtn = document.querySelector("#menuBtn");
const overlayNav = document.querySelector(".overlay-nav");

menuBtn.addEventListener("click", () => {
    overlayNav.classList.toggle("show");
});
document.addEventListener("click", (e) => {

    if (
        !overlayNav.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        overlayNav.classList.remove("show");

    }

});
overlayNav.addEventListener("click", (e) => {

    if (e.target.classList.contains("overlay-btn")) {

        overlayNav.classList.remove("show");

    }

});















window.addEventListener("load", () => {

    const active = localStorage.getItem("activeOverlay");

    if (active === "goal") {
        goalOverlay.classList.add("active");
    }

    else if (active === "todo") {
        todoOverlay.classList.add("active");
    }

    else if (active === "planner") {
        plannerOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    else if (active === "notes") {
        notesOverlay.classList.add("active");
    }

    else if (active === "timer") {

        pomodoroOverlay.classList.add("active");

    }

});