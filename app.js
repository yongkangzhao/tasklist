// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
    // add task
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
}


function addTask(e){
    if(taskInput.value ===''){
        alert('Add a task');
    }
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
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    taskInput.value='';
    e.preventDefault();
}

function removeTask(e){
    if (e.target.className==="fa fa-remove"){
        e.target.parentNode.parentNode.remove();
    }
    e.preventDefault();
}


function clearTasks(e){
    taskList.innerHTML = '';
}