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


// const updateProject = async (
//     projectId,
//     updateData
// ) => {

//     const project =
//     await Project.findByIdAndUpdate(
//         projectId,
//         updateData,
//         { new: true }
//     );

//     if (!project) {
//         throw new Error("Project not found");
//     }

//     return project;
// };

const updateProject = async (
    projectId,
    updateData
) => {

    console.log("Project ID:", projectId);

    const existingProject =
    await Project.findById(projectId);

    console.log("Found Project:", existingProject);

    const project =
    await Project.findByIdAndUpdate(
        projectId,
        updateData,
        {
            returnDocument: "after"
        }
    );

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
    deleteProject,
    updateProject
};
