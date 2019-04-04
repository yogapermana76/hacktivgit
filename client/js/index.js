function getMyRepo() {
  $.ajax({
    url: 'http://localhost:3000/users/yogapermana76/repos',
    method: 'GET'
  })
    .done(function(response) {
      response.forEach(repo => {
        $('#repos').append(`<li class="list-group-item"><a target="_blank" href="${repo.clone_url}">${repo.name}</a></li>`)
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
          <td><a href="${repo.clone_url}">${repo.name}</a></td>
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

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: 'http://localhost:3000/users/signin-google',
    method: 'POST',
    data: {
      id_token
    }
  })
}


$(document).ready(function() {
  getMyRepo();
  getStarredRepo();
  
  $('#createForm').submit(function() {
    createRepo()
  })
})