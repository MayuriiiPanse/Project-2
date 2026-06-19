const Project = require("../models/project.model");

const createProject = async(data)=>{
    return await Project.create(data);
};

const getProjects = async(userId)=>{
    return await Project.find({ user:userId })
    .sort({ createdAt:-1 });
};


const addContentToProject = async (
    projectId,
    contentData
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    project.items.push(contentData);

    await project.save();

    return project;
};

const getProjectById = async (projectId) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

const deleteProject = async (projectId) => {

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
        throw new Error("Project not found");
    }

    return project;
};

module.exports = {
    createProject,
    getProjects,
    addContentToProject,
    getProjectById,
    deleteProject
};
