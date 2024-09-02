let tasks = []

function addTask() {
    let input = document.getElementById('myInput')
    let task = input.value.trim();

    if (task !== "") {
       
        tasks.push(task);
        input.value = "";
        displayTasks();
        
    } else {
        alert('Task not entered!');

    }
    
}
function displayTasks() {
    let showList = document.getElementById('showList');
    let ul = document.createElement('ul');

    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.innerHTML += ` ${task} <button onclick="deleteTask(${index})">Delete</button>`;
        ul.appendChild(li);
        
    });
    
    showList.innerHTML = "";
    showList.appendChild(ul);
}
