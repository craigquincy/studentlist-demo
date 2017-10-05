$(document).ready(() => {

  $.getJSON('/api/v1/students').then(data => {
    console.log("get students", data)
    let tbody = $('#studentList tbody')

    data.forEach((student, i) => {
      tbody.append($(`<tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.mantra}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary">Edit</button>
            <button type="button" class="btn btn-secondary deleteBtn" data-id="${student.id}">Delete</button>
          </div>
        </td>
      </tr>`))
    })
  })

  // listen to delete buttons
  $('#studentList tbody').on('click', '.deleteBtn', (e) => {
    console.log("you want to delete...", $(e.target).data('id'));
    let id = $(e.target).data('id')
    if (id) {
      $.ajax({
        url: `/api/v1/students/${id}`,
        method: "DELETE",
        dataType: 'json'
      }).done(data => {
        $(e.target).closest('tr').hide()
        console.log("deleted", data);
      })
    }
  })

  // event listener
  $('#saveStudent').click((e) => {
    console.log("save clicked?");
    e.preventDefault()

    console.log("submit event is...", e);

    let data = {
      name: $('#newStudent #name').val(),
      mantra: $('#newStudent #mantra').val()
    }

    $.post("/api/v1/students", data, null, 'json')
    .then((data) => {
      console.log("POSTED data", data);
    })
    .fail((err) => {
      $('#errorMessage').html(
        `<div class="alert alert-danger" role="alert">
        ${err.responseText}</div>`
      )
    })
  })
})
