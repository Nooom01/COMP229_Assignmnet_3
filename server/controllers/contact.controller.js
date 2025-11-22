import Contact from '../models/contact.model.js';

export const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: firstname, lastname, email' 
      });
    }

    const contact = new Contact({
      firstname,
      lastname,
      email
    });

    const savedContact = await contact.save();
    res.status(201).json({
      message: 'Contact created successfully',
      contact: savedContact
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating contact',
      error: error.message 
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching contacts',
      error: error.message 
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching contact',
      error: error.message 
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }

    res.status(200).json({
      message: 'Contact updated successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating contact',
      error: error.message 
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }

    res.status(200).json({
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting contact',
      error: error.message 
    });
  }
};
