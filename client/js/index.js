function getMyRepo() {
  $.ajax({
    url: 'http://localhost:3000/users/yogapermana76/repos',
    method: 'GET'
  })
    .done(function(response) {
      console.log(response)
      response.forEach(repo => {
        $('#repos').append(`<li class="list-group-item">${repo.name}</li>`)
      });
    })
    .fail(function(jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function getStarredRepo() {
  $.ajax({
    url: 'http://localhost:3000/users/starred',
    method: 'GET'
  })
    .done(function(response) {
      response.forEach(repo => {
        $('#star-repo').append(`
        <tr>
          <td>${repo.owner.login}</td>
          <td>${repo.name}</td>
        </tr>`)
      });
    })
    .fail(function(jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

function createRepo() {
  event.preventDefault()

  const title = $('#repo').val()
  console.log(title)
  $.ajax({
    url: 'http://localhost:3000/users',
    method: 'POST',
    data: {
      repoName: title
    } // req.body
  })
    .done(function(response) {
      $('#repos').append(`<li>${response.name}</li>`)
    })
    .fail(function(jqXHR, textStatus) {
      console.log('request failed', textStatus)
    })
}

$(document).ready(function() {
  getMyRepo();
  getStarredRepo();
  // createRepo()
  $('#createForm').submit(function() {
    createRepo()
  })
})