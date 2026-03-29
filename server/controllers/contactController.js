const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactNotificationEmail } = require('../utils/email');

const createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array(),
      });
    }

    const { name, phone, message } = req.body;

    const savedContact = await Contact.create({
      name,
      phone,
      message,
    });

    try {
      await sendContactNotificationEmail({
        name: savedContact.name,
        phone: savedContact.phone,
        message: savedContact.message,
        createdAt: savedContact.createdAt,
      });
    } catch (emailError) {
      console.error('Failed to send contact notification email:', emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Your request has been submitted successfully.',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        phone: savedContact.phone,
        message: savedContact.message,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createContact,
};
