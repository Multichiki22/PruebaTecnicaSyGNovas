import ServiceBase from "./serviceBase.ts";

const TaskService = {
    ...ServiceBase,
  
    entidad: 'task',
  
    getTaskByProject: async (id) => {
      return await ServiceBase.get(`/task?project_id=${id}`).catch((error) => {
        throw error;
      });
    },

    createTask: async (data) => {
        return await ServiceBase.post(`/task`,data).catch((error) => {
          throw error;
        });
      },

      updateTaksState: async (id,data) => {
        return await ServiceBase.patch(`/task/${id}`,data).catch((error) => {
          throw error;
        });
      },

      getMyTask: async () => {
        return await ServiceBase.get(`/task/myTasks`).catch((error) => {
          throw error;
        });
      },

      getMyTaskByProject: async (id) => {
        return await ServiceBase.get(`/task/myTasksByProject?project_id=${id}`).catch((error) => {
          throw error;
        });
      },


  };
  
  export default TaskService;
  