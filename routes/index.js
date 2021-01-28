const router = require('express').Router();

const controllers = require('../controllers');

router.get('/', controllers.getMyData);
router.post('/validate-rule', controllers.validateRule);

module.exports = router;
