$(document).ready(() =>{
    $.getJSON("api/todos")
    .then(addTodos)

    $('#todoInput').keypress((event)=>{
        if(event.which == 13){
            createTodo();
        }
    });
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        console.log($(this).parent().data('id'));
        removeTodo($(this).parent());
    });
});

function addTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
    
}

function addTodo(todo){ 
    let newTodo = $('<li class="task">'+todo.name +'<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed)
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo(){
    let usrInput =  $('#todoInput').val();
    $.post('/api/todos', {name:usrInput})
    .then((newTodo)=>{
        addTodo(newTodo);
        $('#todoInput').val('');
    })
    .catch((err) => {console.log(err);});
}

function removeTodo(todo){  
    $.ajax({method: 'DELETE', url: '/api/todos/' + todo.data('id')})
    .then(data => {todo.remove();});
}

function updateTodo(todo){
    let isDone = todo.data('completed')
    let updateData = {completed: !isDone}
    $.ajax({method: 'PUT', url: '/api/todos/' + todo.data('id'), data:updateData})
    .then(updatedTodo => {todo.toggleClass('done');});
    todo.data('completed', isDone);
}