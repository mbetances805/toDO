const router = require('express').Router();
const { Activity } = require('../db/models');
const { Op } = require('sequelize');

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
    activityDate: req.body.activityDate,
    userId: req.body.userId
  })
  .then(activity => res.json(activity))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Activity.update(
    {activityStatus: req.body.activityStatus,
    updatedAt: req.body.updatedAt},
    {where: {
      id: req.params.id
    },
    returning: true,
    plain: true
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
