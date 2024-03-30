let tasks =  [
  {
    title: "قراءة",
    date: "20/6/2024",
    completed: false,
  },
  {
    title: "لغة",
    date: "10/6/2024",
    completed: false,
  },
  {
    title: "استغفار",
    date: "20/9/2024",
    completed: false,
  },
  {
    title: "ورد يومي",
    date: "20/7/2024",
    completed: false,
  },
];
function getReturnTasks() {
 let returnTasks= JSON.parse(localStorage.getItem("tasks"))

 if (returnTasks==null) {
  tasks =[]
 } else {
  tasks =returnTasks
 }
}
getReturnTasks()

let addBtn = document.getElementById("add");
let tasksTable = document.getElementById("tasks");

function allTasks() {
  tasksTable.innerHTML = ""; // يجب مسح محتوى الجدول قبل إعادة بناءه

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    tasksTable.innerHTML += `
      <div class="task ${task.completed ? "done" : ""}">
        <div class="task_info">
          <h3>${task.title}</h3>
          <div>
            <span class="material-symbols-outlined">calendar_month</span>
            <span>${task.date}</span>
          </div>
        </div>
        <div class="task_action">
          <button onclick="deleteTask(${i})" class="btn" style="background-color: rgb(138, 14, 14); color: #ccbcbc">
            <span  class="material-symbols-outlined">delete</span>
          </button>
          ${
            task.completed
              ? `<button onclick="toggleTask(${i})" class="btn" style="background-color: rgb(118, 0, 101); color: #ccbcbc">
                  <span class="material-symbols-outlined">cancel</span>
              </button>`
              : `<button onclick="toggleTask(${i})" class="btn" style="background-color: green; color: #ccbcbc">
                  <span class="material-symbols-outlined">done</span>
              </button>`
          }
          <button onclick="editTask(${i})" class="btn" style="background-color: blue; color: #ccbcbc">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
    `;
  }
}

addBtn.addEventListener("click", function () {
  let taskTitle = prompt("إذا كنت ترغب في إضافة مهمة جديدة، فالرجاء كتابتها!");

  if (taskTitle) { // التأكد من أن المستخدم أدخل عنوان المهمة
    let taskDate =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    let newTask = {
      title: taskTitle,
      date: taskDate,
      completed: false, // استخدم false بدلاً من "false" لقيمة completed
    };

    tasks.push(newTask);
    savedStorage();
    allTasks();
  }
});

function deleteTask(i) {
  let task = tasks[i];
  let isConfirmed = confirm("هل أنت متأكد من إزالة هذه المهمة: " + task.title);

  if (isConfirmed) {
    tasks.splice(i, 1);
    savedStorage();
    allTasks();
  }
}

function editTask(i) {
  let task = tasks[i];
  let taskTitle = prompt("أدخل اسم المهمة الجديد", task.title);

  if (taskTitle) { // التأكد من أن المستخدم أدخل عنوان المهمة
    task.title = taskTitle;
    savedStorage();
    allTasks();
  }
}

function toggleTask(i) {
  let task = tasks[i];
  task.completed = !task.completed;
  savedStorage();
  allTasks();
}

function savedStorage() {
  let savedTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", savedTasks);
}

allTasks();