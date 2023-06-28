const express = require('express');
const ctrl = require('../../controllers/contactsController');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

// router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
