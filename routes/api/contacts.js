const express = require('express');
const ctrl = require('../../controllers/contactsController');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
