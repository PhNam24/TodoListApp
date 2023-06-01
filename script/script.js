let addTaskBtn = document.querySelector(".addTaskBtn");
let inputTaskContent = document.querySelector("#inputTask");
let deleteTaskBtn = document.querySelector(".deleteBtn");
let changeTaskBtn = document.querySelector(".changeBtn");

function getTaskFromLocalStorage()
{
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

let tasks = getTaskFromLocalStorage();

renderTask(tasks);

addTaskBtn.addEventListener('click', function()
{
    if(!inputTaskContent.value)
    {
        alert("Vui lòng nhập công việc!!!");
        return false;
    } 
    let tasks = getTaskFromLocalStorage();  
    let taskId = this.getAttribute('id');
    let task = {name: inputTaskContent.value};
    if(taskId == 0 || taskId) 
    {
        tasks[taskId] = task;
        this.removeAttribute('id');
    }
    else
    {
        tasks.push(task);
    }
    inputTaskContent.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(tasks);
})

function renderTask(tasks = [])
{
    let content = '<ul>';

    tasks.forEach((task, index) => {
        content += `<li class="row">
                        <div class="taskName">${task.name}</div>
                        <button class="changeBtn" onclick="editTask(${index})">Sửa</button>
                        <button class="deleteBtn" onclick="deleteTask(${index})">Xoá</button>
                    </li>`
    });
    content += '</ul>';
    document.querySelector('#result').innerHTML = content;
}

function deleteTask(id)
{
    let tasks = getTaskFromLocalStorage();
    tasks.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask(tasks);
}

function editTask(id)
{
    let tasks = getTaskFromLocalStorage();
    if(tasks.length > 0)
    {
        inputTaskContent.value = tasks[id].name;
        addTaskBtn.setAttribute('id', id);
    }
}