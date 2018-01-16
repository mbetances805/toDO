const router = require ('express').Router();
const { Activity } = require ('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Activity.findAll()
    .then(activities => res.json(activities))
    .catch(next)
})
