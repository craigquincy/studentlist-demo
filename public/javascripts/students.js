$(document).ready(() => {

  // get all students
  if (document.location.href.match(/students$/)) {

    $.getJSON('/api/v1/students').then(data => {
      console.log("get students", data)
      let tbody = $('#studentList tbody')

      data.forEach((student, i) => {
        tbody.append($(`<tr>
        <td><a href="/students/${student.id}">${student.id}</a></td>
        <td>${student.name}</td>
        <td>${student.mantra}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary"><a href="/students/${student.id}/edit">Edit</a></button>
            <button type="button" class="btn btn-secondary deleteBtn" data-id="${student.id}">Delete</button>
          </div>
        </td>
      </tr>`))
      })
    })
  }

  // get single student if there is an id on the end of the url
  let checkId = document.location.href.match(/(\d+)$/) || document.location.href.match(/(\d+)\/edit$/)

  if (checkId) {
    let id = checkId[1]
    console.log("found student id", checkId);

    // if it's the update form populated the fields
    $.getJSON(`/api/v1/students/${id}`).then(data => {
      console.log("fetched a student", id, data);
      if (document.location.href.match(/students\/\d+$/)) {
        updateShow(data)
      } else if (document.location.href.match(/students\/\d+\/edit$/)) {
        updateEditForm(data)
      }
    })

    function updateShow(data) {
      $('.mantra').html(data.mantra)
      $('.name').html(data.name)
    }

    function updateEditForm(data) {
      console.log("updating form");
      $('#newStudent #name').attr("value", data.name)
      $('#newStudent #mantra').attr("value", data.mantra)
    }

  }

  // listen to delete buttons
  $('#studentList tbody').on('click', '.deleteBtn', (e) => {
    console.log("you want to delete...", $(e.target).data('id'));
    let id = $(e.target).data('id')
    if (id) {
      $.ajax({url: `/api/v1/students/${id}`, method: "DELETE", dataType: 'json'}).done(data => {
        $(e.target).closest('tr').hide()
        console.log("deleted", data);
      })
    }
  })

  // new student form
  $('#newStudent').submit((e) => {
    e.preventDefault()

    let data = $('#newStudent').serialize()

    $.post("/api/v1/students", data, null, 'json').then((data) => {
      console.log("POSTED data", data);
      document.location = '/students';
    }).fail((err) => {
      $('#errorMessage').html(`<div class="alert alert-danger" role="alert">
        ${err.responseText}</div>`)
    })
  })

  // update student form
  $('#updateStudent').submit((e) => {
    e.preventDefault()

    let data = $('#updateStudent').serialize()

    $.patch("/api/v1/students", data, null, 'json').then((data) => {
      console.log("PATCHED data", data);
      document.location = '/students';
    }).fail((err) => {
      $('#errorMessage').html(`<div class="alert alert-danger" role="alert">
        ${err.responseText}</div>`)
    })
  })
})
