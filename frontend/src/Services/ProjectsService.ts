import ServiceBase from "./serviceBase.ts";

const ProjectsService = {
    ...ServiceBase,
  
    entidad: 'Projects',
  
    getProjectById: async (id) => {
      return await ServiceBase.get(`/projects/${id}`).catch((error) => {
        throw error;
      });
    },


    createProject: async (body) => {
      return await ServiceBase.post(`/projects`,body).catch((error) => {
        throw error;
      });
    },

    getProjects: async () => {
      return await ServiceBase.get(`/projects`).catch((error) => {
        throw error;
      });
    },
    getMyProjects: async () => {
      return await ServiceBase.get(`/projects/myProjects`).catch((error) => {
        throw error;
      });
    },
    editProject: async (id,body) => {
      return await ServiceBase.put(`/projects/${id}`,body).catch((error) => {
        throw error;
      });
    },
    deletProject: async (id) => {
      return await ServiceBase.delete(`/projects/${id}`,"").catch((error) => {
        throw error;
      });
    },

  };
  
  export default ProjectsService;
  