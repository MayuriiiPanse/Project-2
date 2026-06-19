const projectService = require("../service/project.service");

const createProject = async(req,res)=>{
    try{

        const project = await projectService.createProject({
            user:req.user.id,
            projectName:req.body.projectName,
            description:req.body.description
        });

        res.status(201).json({
            success:true,
            project
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

const getProjects = async(req,res)=>{
    try{

        const projects = await projectService.getProjects(
            req.user.id
        );

        res.status(200).json({
            success:true,
            projects
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


const addContentToProject = async (req, res) => {

    try {

        const project = await projectService.addContentToProject(
            req.params.projectId,
            {
                type: req.body.type,
                content: req.body.content
            }
        );

        res.status(200).json({
            success: true,
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProjectById = async (req, res) => {

    try {

        const project = await projectService.getProjectById(
            req.params.projectId
        );

        res.status(200).json({
            success: true,
            project
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteProject = async (req, res) => {

    try {

        await projectService.deleteProject(
            req.params.projectId
        );

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createProject,
    getProjects,
    addContentToProject,
    getProjectById,
    deleteProject

};