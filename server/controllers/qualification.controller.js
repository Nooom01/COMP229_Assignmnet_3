import Qualification from '../models/qualification.model.js';

export const createQualification = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    if (!title || !firstname || !lastname || !email || !completion || !description) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    const qualification = new Qualification({
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    });

    const savedQualification = await qualification.save();
    res.status(201).json({
      message: 'Qualification created successfully',
      qualification: savedQualification
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating qualification',
      error: error.message 
    });
  }
};

export const getAllQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ completion: -1 });
    res.status(200).json({
      count: qualifications.length,
      qualifications
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching qualifications',
      error: error.message 
    });
  }
};

export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    
    if (!qualification) {
      return res.status(404).json({ 
        message: 'Qualification not found' 
      });
    }

    res.status(200).json(qualification);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching qualification',
      error: error.message 
    });
  }
};

export const updateQualification = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      { title, firstname, lastname, email, completion, description },
      { new: true, runValidators: true }
    );

    if (!qualification) {
      return res.status(404).json({ 
        message: 'Qualification not found' 
      });
    }

    res.status(200).json({
      message: 'Qualification updated successfully',
      qualification
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating qualification',
      error: error.message 
    });
  }
};

export const deleteQualification = async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);

    if (!qualification) {
      return res.status(404).json({ 
        message: 'Qualification not found' 
      });
    }

    res.status(200).json({
      message: 'Qualification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting qualification',
      error: error.message 
    });
  }
};
