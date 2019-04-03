const router = require('express').Router()
const UserController = require('../controllers/userController')

router.get('/', UserController.getRepos)
router.post('/', UserController.createRepo)
router.delete('/:owner/:repoName', UserController.deleteRepo)
router.get('/starred', UserController.getStarredRepo)
router.delete('/starred/:owner/:repo', UserController.unstarRepo)
router.get('/:username/repos', UserController.searchRepo)

module.exports = router