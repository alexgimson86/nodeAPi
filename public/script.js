// //Get (read all todos)
// const link = 'http://localhost:3000/todos/';
// $(document).ready( () => {
//   $.ajax({
//     url: link,
//     method: 'GET'
//   })
//   .done((data) => {
//     data.todoArray.forEach((todo)=>{
//       if(!todo.isComplete)
//         $('ul').append(`<li id=${todo.id}><span>X</span>${todo.description}</li>`)
//       else
//       $('ul').append(`<li class=completed id=${todo.id}><span>X</span>${todo.description}</li>`)
//     })
//   })
//   .fail(console.log('didnt work'));
  
//   //PUT (update completion status)
//   $('ul').on('click', 'li', function(){
//     $(this).toggleClass('completed');
//     const upLink = link + $(this).attr('id')
//     $.ajax({
//       url: upLink,
//       method: 'PUT'

//     })
//   });
//   //DELETE todo
//   $('ul').on('click', 'span', function(event){
//     //$(this).parent().remove();
    
    
//     if(confirm("Are you sure?")){
//       var id = $(this).parent().attr('id');
//       var deleteLink = link + id;
//       var todoList = '';
//       $(this).parent().remove();
//       $(this).remove()
//       $.ajax({
//         url: deleteLink,
//         method: 'DELETE'
//       })
//       .done((data)=>{
//         data.todoArray.forEach((todo)=>{
//           todoList += `<li id =${todo._id}><span><i class='fa fa-times'></i></span>${todo.description}</li>`;
//         })
//         $('ul').innerHTML = todoList
//       })
//       .fail(console.log('delete didnt work'))
//     }
//     return false;
    
//   });
//   //POST 
//   $('input').keypress(function(event){
//     if(event.which===13 && $(this).val() !== ""){
//       // we'll add here
//       var todoItem = $(this).val();
//         $.ajax({
//           url: link,
//           method: 'POST',
//           data: todoItem
//         })
//         .done($('ul').append(
//           "<li>" +
//           todoItem +
//           "<span>" +
//           "<i class='fa fa-times'></i>" +
//           "</span>" +
//           "</li>"
//           ))
//         .fail(console.log('post failes'))
        
//         }
//       });
      
//       $('input').keypress(function(event){
//         if(event.which===13)
//         $(this).val('');
//       });
//     });
// set var to url in stead of typing multiple times
const name = "tristan";
const link = 'http://localhost:3000/todos';

// GET (Read) all the todos
$(document).ready(() => {

    const displayLink = link + "/username/" + name;
    // call the api
    $.ajax({
        url: displayLink,
        method: 'GET'
    })
        // parse the payload
        .done((data) => {
            data.forEach((todo) => {
                let isComplete = todo.isComplete ? "completed" : "";
                $('ul').append(
                    `<li data-id="${todo.id}" class="${isComplete}"><span>X</span>${todo.description}</li>`
                )
            })
            console.log('Success');
        })
        .fail(function(error) {
            console.error('Page did not load', error);
        });
});

// POST (Create a new todo)
$('input').keypress(function (event) {
    var postLink = link + "/username/" + name;
    if (event.which === 13 && $(this).val() !== "") {
        var todoItem = $(this).val().trim().substr(0, 40);
        $.ajax({
            url: postLink,
            method: 'POST',
            data: { description: todoItem }
        })
            .done((returnedTodo) => {
                console.log('success');
                let isComplete = returnedTodo[0].isComplete ? "completed" : "";
                $('ul').append(
                    `<li data-id="${returnedTodo[0]._id}" class="${isComplete}"><span>X</span>${returnedTodo[0].description}</li>`
                );
                $('input').val('');
            })
            .fail((error) => {
                console.error('Data did not load from backend:', error);
            });
    }
});


// PUT (Update the completion status)
$('ul').on('click', 'li', function(){
    var url = link + '/' + $(this).data('id');
    let that = this;
    $.ajax({
        url: url,
        method: 'PUT'
    })
        .done(function() {
            $(that).toggleClass('completed');
        })
        .fail(function() {
            // console.log('fail');
        })
});

// DELETE (Remove the todo)  
$('ul').on('click', 'span', function (event) {
    var thisId = $(this).parent().data('id');
    var url = `${link}/${thisId}`;
    $.ajax({
        url: url,
        dataType: 'json',
        method: 'DELETE',
    }) .success(function(){
        $(this).parent().remove();
    }).fail(function(err){
        console.log('delete failed with error', err)
    });
});



