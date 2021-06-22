const taskContainer = document.querySelector(".task_container");
let globalStore = []; //array
const generateNewCard = (taskData) => ` `;

const loadInitialCardData = {} => {
    // localstorage to get tasky data
    const getCardData = localStorage.getItem("tasky");

    // convert to normal object
    const {cards} = JSON.parse(getCardData);

    // loop over those array of task object to create html card, inject it to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    // update our globalStore
    globalStore.push(cardObject);
    })
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,//unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);// globalStore is array

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore})); // an object
};

const deleteCard = (event) =>{
    //id
    event = window.event;
    const targetId = event.target.id;
    const tagname = event.target.tagName;
    // match the id of the element with the id inside the globalStore
    // if found remove it

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId);

    // contact parent
    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
    // taskContainer.removeChild()
};