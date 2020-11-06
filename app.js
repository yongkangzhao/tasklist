// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);

    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}


function getTasks(e){
    let tasks;
    if (localStorage.getItem('tasks')){
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }else{
        tasks = []
    }
    let counter = 0;
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    tasks.forEach(function(task){
            // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"'+'id="'+String(counter)+'"'+'></i>';
        counter += 1;
        // append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    })
}


function addTask(e){
    if(taskInput.value ===''){
        alert('Add a task');
        return;
    }
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"'+'id="'+String(tasks.length-1)+'"'+'></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    
    console.log(tasks);
    
    taskInput.value='';
    e.preventDefault();
}

function removeTask(e){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(e);
    if (e.target.className==="fa fa-remove"){
        e.target.parentNode.parentNode.remove();
        tasks.splice(e.target.id,1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks(e);
    e.preventDefault();
}


function clearTasks(e){
    // simple naive remove 
    // taskList.innerHTML = '';
    // iterative remove
    tasks = JSON.parse(localStorage.getItem('tasks'));
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
        tasks.shift();
    }
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) >= 0){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}