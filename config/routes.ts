export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    code: 'home',
    name: 'home',
    icon: 'dashboard',
    component: './Welcome',
  },
  {
    path: '/system',
    code: 'system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        path: '/system',
        redirect: '/system/menu',
      },
      {
        path: '/system/menu',
        code: 'menu',
        name: 'menu',
        component: './system/Menu',
      },
      {
        path: '/system/role',
        code: 'role',
        name: 'role',
        component: './system/Role',
      },
      {
        path: '/system/user',
        code: 'user',
        name: 'user',
        component: './system/User',
      },
      {
        path: '/system/logger',
        code: 'logger',
        name: 'logger',
        component: './system/Logger',
      },
    ],
  },
  {
    path: '/master',
    code: 'master',
    name: 'master',
    icon: 'bank',
    routes: [
      {
        path: '/master',
        redirect: '/master/unit',
      },
      {
        path: '/master/unit',
        code: 'unit',
        name: 'unit',
        component: './master/Unit',
      },
      {
        path: '/master/cabang',
        code: 'cabang',
        name: 'cabang',
        component: './master/Cabang',
      },
      {
        path: '/master/nik',
        code: 'nik',
        name: 'NIK',
        component: './master/Nik',
      },
      {
        path: '/master/kelompok',
        code: 'kelompok',
        name: 'Kelompok',
        component: './master/Kelompok',
      },
    ],
  },
  {
    path: '/account/profile',
    name: 'account.settings',
    component: './user/Profile',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
