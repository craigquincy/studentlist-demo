$(document).ready(() => {

  $.getJSON('/api/v1/students').then(data => {
    console.log("get students", data)
    let tbody = $('#studentList tbody')

    data.forEach((student, i) => {
      tbody.append($(`<tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.mantra}</td>
      </tr>`))
    })
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
