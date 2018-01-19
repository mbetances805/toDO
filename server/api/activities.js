const router = require('express').Router();
const { Activity } = require('../db/models');
module.exports = router;

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Activity.findAll({
    where: {
      userId: id,
    }
  })
    .then(activities => res.json(activities))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Activity.create({
    activityDescription: req.body.activityDescription,
    activityDate: req.body.today,
    userId: req.body.userId
  })
  .then(res.sendStatus(201))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  return Activity.update({
    where: {
      id: req.param.id
    }
  })
  .then(res.sendStatus(202))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Activity.destroy({
    where: {
      id: id}
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})
