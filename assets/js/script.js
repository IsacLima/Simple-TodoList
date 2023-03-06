document.getElementsByClassName("nav__img")[0].addEventListener("click", function(event){ openTt()});

document.getElementsByClassName("cancel")[0].addEventListener("click", function(event){ closeTt()});

//objeto com as informações da tarefa que vai ser modificada
var taskObject = {
    actual: "none",
    title: "Título",
    description: "Descrição"
}

//variavel para decisão de exibir ou esconder as tarefas em tela
let haveTask = false

//abre a janela de criação de tarefa
function openTt(){
    document.getElementsByClassName("add")[0].innerHTML = "Add"
    document.getElementsByClassName("empty")[0].style.display = "none"
    document.getElementsByClassName("floatbox")[0].style.display = "flex"
    document.getElementsByClassName("nav")[0].style.display = "none"
    backgroundDark()
    if(document.getElementsByClassName("options").length > 0){
        hideTasks()
    }
}

function backgroundDark(){
    if(document.getElementsByClassName("container")[0].classList == "container background--gray"){
        document.getElementsByClassName("container")[0].classList.remove("background--gray")
    }
    else{
        document.getElementsByClassName("container")[0].classList.add("background--gray")
    }
}

//fecha a janela de criação de tarefa só que sem criar um nova tarefa
function closeTt(){
    checkTasks()
    backgroundDark()
    document.getElementsByClassName("floatbox")[0].style.display = "none"
    document.getElementsByClassName("nav")[0].style.display = "flex"
    document.getElementsByClassName("body__input")[0].value = ""
    document.getElementsByClassName("body__input")[1].value = ""

    showTasks()
}

//fecha a janela de criação de tarefa criando uma tarefa nova
function closeTtAdd(){
    backgroundDark()
    checkTasks()
    document.getElementsByClassName("floatbox")[0].style.display = "none"
    document.getElementsByClassName("nav")[0].style.display = "flex"
}

document.getElementsByClassName("add")[0].addEventListener("click", function(){ 
    //se for somente adicionar uma tarefa e nao editar chama-se a função addTask()
    if(document.getElementsByClassName("add")[0].innerHTML == "Add"){
        addTask(event)
    }
    //caso seja uma edição, pega-se os valores alterados e substitui na tarefa ja existente 
    else{
        haveTask = "True"
        closeTtAdd()
        showTasks()
        taskObject.title = event.target.parentElement.parentElement.children[1].children[0].children[1].value.toUpperCase()
        taskObject.description = event.target.parentElement.parentElement.children[1].children[1].children[1].value
        document.getElementsByClassName("body__input")[0].value = ""
        document.getElementsByClassName("body__input")[1].value = ""
        taskObject.actual.children[0].children[0].innerHTML = taskObject.title
        taskObject.actual.children[1].innerHTML = taskObject.description
        const options = document.getElementsByClassName("options") 
        for(let item of options){
            if(item.style.display == "flex"){
                item.style.display = ""
            }
        }
    }
})

//aqui é feita toda a criação da tarefa consumindo as informações inseridas pelo usuario
function addTask(){
    haveTask = true
    closeTtAdd()
    taskObject.title = event.target.parentElement.parentElement.children[1].children[0].children[1].value.toUpperCase()
    taskObject.description = event.target.parentElement.parentElement.children[1].children[1].children[1].value
 
    createTask()

    document.getElementsByClassName("body__input")[0].value = ""
    document.getElementsByClassName("body__input")[1].value = ""

    showTasks()

} 

//cria o elemento HTML da tarefa e adiciona os eventos de click nas opções
function createTask(){

    document.getElementsByClassName("empty")[0].style.display = "none"
    const task = document.createElement("div")
    task.classList.add("task")
    const navTask = document.createElement("div")
    navTask.classList.add("nav__task")
    const taskTitle = document.createElement("div")
    taskTitle.classList.add("task__title")
    const titulo = document.createTextNode(taskObject.title)
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
    const descricao = document.createTextNode(taskObject.description)
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

    //adiciona evento de clique para riscar a tarefa quando concluida
    input.addEventListener("click", function(){
        if(event.target.checked){
            taskTitle.style.textDecoration = "line-through"
            taskInfo.style.textDecoration = "line-through"
        }

        else{
            taskTitle.style.textDecoration = ""
            taskInfo.style.textDecoration = ""
        }
    })

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

    const options = document.createElement("div")
    options.classList.add("options")
    const edit = document.createElement("div")
    edit.classList.add("edit")
    edit.innerHTML = "Editar..."
    const remove = document.createElement("div")
    remove.classList.add("remove")
    remove.innerHTML = "Remover"
    options.appendChild(edit)
    options.appendChild(remove)

    const container = document.getElementsByClassName("container")
    container[0].appendChild(task)
    task.appendChild(navTask)
    task.appendChild(taskInfo)
    task.appendChild(checkbox)
    task.appendChild(taskTooltip)
    task.appendChild(options)
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
    document.getElementsByClassName("task")[0].style.marginTop = "60px"

    if(taskObject.title == ""){
        const titulo = document.createTextNode("TÍTULO")
        taskTitle.appendChild(titulo)
    }

    if(taskObject.description == ""){
        const descricao = document.createTextNode("Descrição")
        taskInfo.appendChild(descricao)
    }

    //chama a função de abrir as opções toda vez que cria-se uma nova tarefa
    const option = document.getElementsByClassName("task__options")
    option[option.length-1].addEventListener("mouseover", function(){ openOptions(options)})

    option[option.length-1].addEventListener("mouseout", function(){ closeOptions(options)})

    //cria um evento de remoção toda vez que se cria uma tarefa
    const removeOption = document.getElementsByClassName("remove") 
    removeOption[removeOption.length-1].addEventListener("click", function(event){ removeTask()});

    //cria um evento de edição toda vez que se cria uma tarefa
    const editOption = document.getElementsByClassName("edit") 
    editOption[editOption.length-1].addEventListener("click", function(event){ 
        taskObject.title = event.target.parentNode.parentNode.children[0].children[0].innerHTML
        taskObject.description = event.target.parentNode.parentNode.children[1].innerHTML
        editTask(taskObject.title, taskObject.description)
    });
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

//fecha o menu de opções das tarefas
function closeOptions(options){
    options.style.display = ""
}

//abre o menu de opções das tarefas
function openOptions(options){
    options.style.display = "flex"
    options.style.top = `${event.pageY + 2}px`
    options.style.left = `${event.pageX - 160}px`
    

    /*
    if(options.style.display == "flex"){
        options.style.display = ""
    }
    else{
        options.style.display = "flex"
        options.style.top = `${event.pageY + 10}px`
        options.style.left = `${event.pageX - 160}px`
    }*/
}

//remove a tarefa especifica
function removeTask(){
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode)
    if(document.getElementsByClassName("remove").length < 1){
        haveTask = false
        checkTasks()
    }
}

//pega a mesma tela de criação de tarefa a altera alguns valores para ficar no formato de edicao e as alteraçoes 
//sao criadas dentro da funcao do evento de click do botao 'add'
function editTask(titulo, descricao){ 
    openTt()
    document.getElementsByClassName("body__input")[0].value = `${titulo}`
    document.getElementsByClassName("body__input")[1].value = `${descricao}`
    document.getElementsByClassName("add")[0].innerHTML = "Editar"
    taskObject.actual = event.target.parentNode.parentNode  
}