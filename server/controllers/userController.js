const axios = require('axios')
let ax = axios.create({
  baseURL: 'https://api.github.com'
})

ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

class UserController {
  static getRepos(req, res) {
    ax
      .get('/users')
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createRepo(req, res) {
    ax
      .post('/user/repos', {
        name: req.body.repoName
      })
      .then(({data }) => {
        res.status(201).json(data)
        console.log('sukses brooooooo');
        
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteRepo(req, res) {
    ax
      .delete(`/repos/${req.params.owner}/${req.params.repoName}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getStarredRepo(req, res) {
    ax
      .get(`/user/starred`)
      .then(({ data }) => {
        if(req.body.repoName) {
          data.forEach(repo => {
            if(repo.name == req.body.repoName) {
              res.status(200).json(repo)
            }
          });
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static unstarRepo(req, res) {
    ax
      .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static searchRepo(req, res) {
    ax
      .get(`/users/${req.params.username}/repos`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = UserController