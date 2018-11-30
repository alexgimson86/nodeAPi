//Get (read all todos)
const link = 'http://localhost:3000/todos/';
$(document).ready( () => {
  $.ajax({
    url: link,
    method: 'GET'
  })
  .done((data) => {
    data.todoArray.forEach((todo)=>{
      $('ul').append(`<li id=${todo.id}><span>X</span>${todo.description}</li>`)
    })
  })
  .fail(console.log('didnt work'));
  
  //PUT (update completion status)
  $('ul').on('click', 'li', function(){
    $(this).toggleClass('completed');
  });
  //DELETE todo
  $('ul').on('click', 'span', function(event){
    //$(this).parent().remove();
    
    
    if(confirm("Are you sure?")){
      var id = $(this).parent().attr('id');
      var deleteLink = link + id;
      var todoList = '';
      $(this).parent().remove();
      $(this).remove()
      $.ajax({
        url: deleteLink,
        method: 'DELETE'
      })
      .done((data)=>{
        data.todoArray.forEach((todo)=>{
          todoList += `<li id =${todo.id}><span>X</span>${todo.description}</li>`;
        })
        $('ul').innerHTML = todoList
      })
      .fail(console.log('delete didnt work'))
    }
    return false;
    
  });
  //POST 
  $('input').keypress(function(event){
    if(event.which===13 && $(this).val() !== ""){
      // we'll add here
      var todoItem = $(this).val();
      $('ul').append(
        "<li>" +
        todoItem +
        "<span>" +
        "<i class='fa fa-times'></i>" +
        "</span>" +
        "</li>"
        );
      }
    });
    
    $('input').keypress(function(event){
      if(event.which===13)
      $(this).val('');
    });
  });