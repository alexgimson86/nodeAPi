//Get (read all todos)
const link = 'http://localhost:3000/todos/';
$(document).ready( () => {
  $.ajax({
    url: link,
    method: 'GET'
  })
  .done((data) => {
    data.todoArray.forEach((todo)=>{
      if(!todo.isComplete)
        $('ul').append(`<li id=${todo._id}><span>X</span>${todo.description}</li>`)
      else
      $('ul').append(`<li class=completed id=${todo._id}><span>X</span>${todo.description}</li>`)
    })
  })
  .fail(console.log('didnt work'));
  
  //PUT (update completion status)
  $('ul').on('click', 'li', function(){
    $(this).toggleClass('completed');
    const upLink = link + $(this).attr('id')
    $.ajax({
      url: upLink,
      method: 'PUT'

    })
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
          todoList += `<li id =${todo._id}><span><i class='fa fa-times'></i></span>${todo.description}</li>`;
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
        $.ajax({
          url: link,
          method: 'POST',
          data: todoItem
        })
        .done($('ul').append(
          "<li>" +
          todoItem +
          "<span>" +
          "<i class='fa fa-times'></i>" +
          "</span>" +
          "</li>"
          ))
        .fail(console.log('post failes'))
        
        }
      });
      
      $('input').keypress(function(event){
        if(event.which===13)
        $(this).val('');
      });
    });