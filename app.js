//select the ui list
const form=document.querySelector("#task-form");
const inputTask=document.querySelector('#task');
const filterTask=document.querySelector('#filter');
const collection=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');

//load all event listners

loadEventlistener();

//load eventListner

function loadEventlistener(){
    form.addEventListener('submit',addTask);
    //remove single li
    collection.addEventListener('click',removeTask);
    //clear all tasks
    clearBtn.addEventListener('click',clearTask);

    //filter task
    filterTask.addEventListener('keyup',filterAtask);

    //on load the dom
    document.addEventListener('DOMContentLoaded',getTask)

}

//get task from LS on Load Dom

function getTask(e){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
      tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        let li=document.createElement('li');
    
        //add class in it
    
        li.className='collection-item';
        //add text node to li
        li.appendChild(document.createTextNode(task));
    
        //create link element
    
        let link=document.createElement('a');
        //add classes to link element
    
        link.className='delete-item secondary-content';
         //add innerHtml to link
        link.innerHTML="<i class='fa fa-remove'></i>";
        //append link to li
    
        li.appendChild(link);
        //append li to ul
        collection.appendChild(li);
    
    })
}

//add task

function addTask(e){
  
    if(inputTask.value===''){
        alert('add task');
    }
    //create li Element
    let li=document.createElement('li');
    
    //add class in it

    li.className='collection-item';
    //add text node to li
    li.appendChild(document.createTextNode(inputTask.value));

    //create link element

    let link=document.createElement('a');
    //add classes to link element

    link.className='delete-item secondary-content';
     //add innerHtml to link
    link.innerHTML="<i class='fa fa-remove'></i>";
    //append link to li

    li.appendChild(link);
    //append li to ul
    collection.appendChild(li);

    //set to LS

    setTasktoLocalStorage(inputTask.value);

    inputTask.value='';
    // console.log(li);

    e.preventDefault();
}

// set task to LS

function setTasktoLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
      tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are u sure')){
            e.target.parentElement.parentElement.remove();

            //remove task from LS

            removeTaskfromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove task from LS

function removeTaskfromLocalStorage(task){
//   let lsArray= JSON.parse(localStorage.getItem('tasks'));
//   lsArray.forEach(function(value,index){
//     if(value===task){
//         console.log(index);
//         console.log("task:",task);
//         console.log("value: " ,value)
//     }
//     // console.log(index);
//     // console.log(value);
//   })

console.log(task.textContent);

let newTask=[];
for(let i=0 ;i<lsArray.length;i++){
    if(lsArray[i]!=task.textContent){
     newTask.push(lsArray[i]);
    }
}
console.log(newTask);
localStorage.setItem('tasks',JSON.stringify(newTask));

}

//clear task

function clearTask(e){
collection.innerHTML='';

//clear from LS
clearfromLocalStorage();

}

//clear from LS

function clearfromLocalStorage(){
    localStorage.clear();
}

//fiter task

function filterAtask(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        // console.log(task);
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
           task.style.display='block';
        }else{
            task.style.display='none';
        }
    });
}










