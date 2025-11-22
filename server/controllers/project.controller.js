import Project from '../models/project.model.js';

export const createProject = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    if (!title || !firstname || !lastname || !email || !completion || !description) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    const project = new Project({
      title,
      firstname,
      lastname,
      email,
      completion,
      description
    });

    const savedProject = await project.save();
    res.status(201).json({
      message: 'Project created successfully',
      project: savedProject
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating project',
      error: error.message 
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ completion: -1 });
    res.status(200).json({
      count: projects.length,
      projects
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching projects',
      error: error.message 
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        message: 'Project not found' 
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching project',
      error: error.message 
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, firstname, lastname, email, completion, description },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ 
        message: 'Project not found' 
      });
    }

    res.status(200).json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating project',
      error: error.message 
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        message: 'Project not found' 
      });
    }

    res.status(200).json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting project',
      error: error.message 
    });
  }
};
