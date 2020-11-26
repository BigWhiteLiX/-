export const user = {
    LoginUser: 'login',
    GetUsers: 'users',
    AddUser: 'users',
    DeleteUser: 'users',    // 删除一个用户
    GetUser: "users", // 根据id查询某一个用户信息、
    UpdateUser: "users", // 根据id更新某一个用户的信息
};

// 关于权限的接口
export const rights = {
    AsideMenus: "menus",
    GetRights:'rights/list'
}

// 关于角色的接口
export const role = {
    GetRoles: 'roles'
}