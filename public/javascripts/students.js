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
})
