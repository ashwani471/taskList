const form = document.getElementById('task-form');
// console.log(form);
const taskInput = document.querySelector('#task');
const filterTask = document.getElementById('filter');
const collection = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// console.log(clearBtn);

loadEventlistener();

function loadEventlistener(){

    document.addEventListener('DOMContentLoaded',getTask);

    form.addEventListener('submit',addTask);
  
    collection.addEventListener('click', removeTask);

    clearBtn.addEventListener('click',clearTask);

    filterTask.addEventListener('keyup',filterATask);
}

function getTask(e){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
      tasks = [];
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        if(taskInput.value === ''){
            alert('Add task');
          }
        
          let li = document.createElement('li');
          li.className = 'collection-item';
          li.appendChild(document.createTextNode(task));
          
          let link = document.createElement('a');
          link.className = 'delete-item secondary-content';
          link.innerHTML = "<i class = 'fa fa-remove'>";
          
          li.appendChild(link);
        
          collection.appendChild(li);
    })
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure')){
    e.target.parentElement.parentElement.remove();
  }
}
}

function filterATask(e){
// console.log(e.target.value);
const text = e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(task){
  const item = task.firstChild.textContent;
  if(item.toLowerCase().indexOf(text)!=-1){
    task.style.display = 'block';
  }else{
    task.style.display ='none';
  }
});
}

function clearTask(e){
    collection.innerHTML = '';
}

function StoreTaskinLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null ){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));

}

function addTask(e){

  if(taskInput.value === ''){
    alert('Add task');
  }

  let li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  let link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = "<i class = 'fa fa-remove'>";
  
  li.appendChild(link);

  collection.appendChild(li);
//   console.log(li);

// store Task in LS
StoreTaskinLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}