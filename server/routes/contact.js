const express = require('express');
const { body } = require('express-validator');
const { createContact } = require('../controllers/contactController');

const router = express.Router();

router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required.')
      .isLength({ min: 2, max: 120 })
      .withMessage('Name must be between 2 and 120 characters.'),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone is required.')
      .matches(/^[0-9+\-\s()]{8,20}$/)
      .withMessage('Phone number format is invalid.'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required.')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters.'),
  ],
  createContact,
);

module.exports = router;
