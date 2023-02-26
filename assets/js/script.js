document.getElementsByClassName("nav__img")[0].addEventListener("click", function(event){ openTt()});

document.getElementsByClassName("cancel")[0].addEventListener("click", function(event){ closeTt()});

let haveTask = "False"

//abre a janela de criação de tarefa
function openTt(){
    document.getElementsByClassName("empty")[0].style.display = "none"
    document.getElementsByClassName("floatbox")[0].style.display = "flex"
    document.getElementsByClassName("nav")[0].style.display = "none"
    
    hideTasks()
}

//fecha a janela de criação de tarefa só que sem criar um nova tarefa
function closeTt(){
    checkTasks()
    document.getElementsByClassName("floatbox")[0].style.display = "none"
    document.getElementsByClassName("nav")[0].style.display = "flex"
    document.getElementsByClassName("body__input")[0].value = ""
    document.getElementsByClassName("body__input")[1].value = ""

    showTasks()
}

//fecha a janela de criação de tarefa criando uma tarefa nova
function closeTtAdd(){
    checkTasks()
    document.getElementsByClassName("floatbox")[0].style.display = "none"
    document.getElementsByClassName("nav")[0].style.display = "flex"
}

document.getElementsByClassName("add")[0].addEventListener("click", function(event){ addTask(event)})

//aqui é feita toda a criação da tarefa consumindo as informações inseridas pelo usuario
function addTask(event){
    haveTask = "True"
    closeTtAdd()
    document.getElementsByClassName("empty")[0].style.display = "none"
    const task = document.createElement("div")
    task.classList.add("task")
    const navTask = document.createElement("div")
    navTask.classList.add("nav__task")
    const taskTitle = document.createElement("div")
    taskTitle.classList.add("task__title")
    const titulo = document.createTextNode(event.target.parentElement.parentElement.children[1].children[0].children[1].value.toUpperCase())
    taskTitle.appendChild(titulo)
    const taskOption = document.createElement("div")
    taskOption.classList.add("task__options")
    const circle1 = document.createElement("div")
    circle1.classList.add("circle")
    const circle2 = document.createElement("div")
    circle2.classList.add("circle")
    const circle3 = document.createElement("div")
    circle3.classList.add("circle")
    const taskInfo = document.createElement("div")
    taskInfo.classList.add("task__info")
    const descricao = document.createTextNode(event.target.parentElement.parentElement.children[1].children[1].children[1].value)
    taskInfo.appendChild(descricao)
    const checkbox = document.createElement("div")
    checkbox.classList.add("checkbox")
    const checkText = document.createElement("h3")
    checkText.classList.add("check__text")
    const concluida = document.createTextNode("Concluída")
    checkText.appendChild(concluida)
    const input = document.createElement("input")
    input.type = "checkbox"
    input.classList.add("check")
    const label = document.createElement("label")
    label.htmlFor = "check"
    label.classList.add("checkmark")
    const taskTooltip = document.createElement("div")
    taskTooltip.classList.add("task__tooltip")
    const ttEdit = document.createElement("h3")
    ttEdit.classList.add("task__tx")
    ttEdit.classList.add("edit")
    const editTx = document.createTextNode("Editar")
    ttEdit.appendChild(editTx)
    const ttDel = document.createElement("h3")
    ttDel.classList.add("task__tx")
    ttDel.classList.add("delete")
    const delTx = document.createTextNode("Remover")
    ttDel.appendChild(delTx)

    const container = document.getElementsByClassName("container")
    container[0].appendChild(task)
    task.appendChild(navTask)
    task.appendChild(taskInfo)
    task.appendChild(checkbox)
    task.appendChild(taskTooltip)
    navTask.appendChild(taskTitle)
    navTask.appendChild(taskOption)
    taskOption.appendChild(circle1)
    taskOption.appendChild(circle2)
    taskOption.appendChild(circle3)
    checkbox.appendChild(checkText)
    checkbox.appendChild(input)
    checkbox.appendChild(label)
    taskTooltip.appendChild(ttEdit)
    taskTooltip.appendChild(ttDel)
    task.style = "flex"

    if(event.target.parentElement.parentElement.children[1].children[0].children[1].value == ""){
        const titulo = document.createTextNode("TÍTULO")
        taskTitle.appendChild(titulo)
    }

    if(event.target.parentElement.parentElement.children[1].children[1].children[1].value == ""){
        const descricao = document.createTextNode("Descrição")
        taskInfo.appendChild(descricao)
    }

    document.getElementsByClassName("body__input")[0].value = ""
    document.getElementsByClassName("body__input")[1].value = ""

    showTasks()

    const options = document.getElementsByClassName("task__options")

    //chama a função de abrir as opções toda vez que cria-se uma nove tarefa
    options[options.length-1].addEventListener("click", function(event){ openOptions(event)})

} 

//checa se ja tem alguma tarefa criada
function checkTasks(){
    if (haveTask){
        document.getElementsByClassName("empty")[0].style.display = "none"
    }
    else{
        document.getElementsByClassName("empty")[0].style.display = "flex"
    }
}

//mostra as tarefas quando fecha a janela de criação
function showTasks(){
    if(haveTask){
        tasks = document.getElementsByClassName("task")
        for(let item of tasks){
            item.style.display = ""
        }
    }
}

//esconde as tarefas quando abre a janela de criação
function hideTasks(){
    if(haveTask){
        tasks = document.getElementsByClassName("task")
        for(let item of tasks){
            item.style.display = "none"
        }
    }

    if(document.getElementsByClassName("options")[0].style.display == "flex"){
        document.getElementsByClassName("options")[0].style.display = ""
    }
}

//abre o menu de opções das tarefas
function openOptions(){
    let options = document.getElementsByClassName("options")[0]
    event.target.parentNode.parentNode.parentNode.appendChild(options)
    if(options.style.display == "flex"){
        options.style.display = ""
    }
    else{
        options.style.display = "flex"
        options.style.top = `${event.pageY + 10}px`
        options.style.left = `${event.pageX - 160}px`
        document.getElementsByClassName("remove")[0].addEventListener("click", function(event){ removeTask()});
    }
}

//remove a tarefa especifica
function removeTask(){
    console.log(event.target.parentNode.parentNode.parentNode)
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode)
}

//como inserimos o menu de opções para dentro da task, quando removida, ficamos sem o 'menu' para 
//inserir nas tarefas futuras (proximo passo)