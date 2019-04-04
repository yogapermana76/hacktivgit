const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../model/user')
const axios = require('axios')
const jwt = require('jsonwebtoken')

let ax = axios.create({
  baseURL: 'https://api.github.com'
})

ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

class UserController {

  static signInGoogle(req, res) {
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      // res.status(200).json(ticket.getPayload());
      return User.findOne({
        email: ticket.getPayload().email
      })
    })
    .then(user => {
      if(!user) {
        return User.create({
          
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

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