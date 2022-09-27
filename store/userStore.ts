export type IUserInfo = {
    userId?: number | null,
    nickname?: string,
    avatar?: string,
    id?: number,
  };
  
  export interface IUserStore {
    userInfo: IUserInfo;
    // eslint-disable-next-line no-unused-vars
    setUserInfo: (value: IUserInfo) => void;
  }
  
  const userStore = (): IUserStore => {
    return {
      userInfo: {},
      setUserInfo: function (value) {
        this.userInfo = value;
      },
    };
  };
  
  export default userStore;



// export type IUserInfo = {
//     userId?: number | null, // 用户id
//     nickname?: string, // 昵称
//     avatar?: string, // 头像
// };
// export interface IUserStore {
//     userInfo: IUserInfo;
//     // eslint-disable-next-line no-unused-vars
//     setUserInfo: (value: IUserInfo) => void;
// }
// const userStore = (): IUserStore => {
//     return {
//         userInfo:{},
//         setUserInfo: function(value) {
//             this.userInfo = value;
//         },
//     };
// }
// export default userStore;



