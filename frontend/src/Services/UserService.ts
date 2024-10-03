import ServiceBase from "./serviceBase.ts";

const userService = {
    ...ServiceBase,
  
    entidad: 'Users',
  
    getUsersInfo: async () => {
      return await ServiceBase.get(`/users`).catch((error) => {
        throw error;
      });
    },
  };
  
  export default userService;
  