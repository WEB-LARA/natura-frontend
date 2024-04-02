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
      {
        path: '/master/msource',
        code: 'msource',
        name: 'Source',
        component: './master/Msource',
      },
      {
        path: '/master/akun',
        code: 'akun',
        name: 'Akun',
        component: './master/Akun',
      },
    ],
  },
  {
    path: '/natura',
    code: 'natura',
    name: 'Natura',
    icon: 'build',
    routes: [
      {
        path: '/natura',
        redirect: '/natura/naturaheader',
      },
      {
        path: '/natura/naturaapi',
        code: 'naturaapi',
        name: 'Natura API',
        component: './natura/ListApi',
      },
      {
        path: '/natura/naturafile',
        code: 'naturafile',
        name: 'Natura File',
        component: './natura/ListFile',
      },
      {
        path: '/natura/naturaheader',
        code: 'naturaheader',
        name: 'Natura List',
        component: './natura/Natura',
      },
      {
        path: '/natura/upload',
        code: 'naturaupload',
        name: 'Natura Upload',
        component: './natura/ListFile/NaturaUpload',
        hideInMenu: true,
      },
      {
        path: '/natura/naturaadd/:id?',
        code: 'naturaadd',
        name: 'Natura Add',
        component: './natura/NaturaAdd',
        hideInMenu: true,
      },
      {
        path: '/natura/recon',
        code: 'naturarecon',
        name: 'Natura Reconciliation',
        component: './natura/Recon',
      },
      {
        path: '/natura/naturaprocessadd',
        code: 'naturaprocessadd',
        name: 'Natura Process Add',
        component: './natura/ProcessAdd',
        hideInMenu: true,
      },
      {
        path: '/natura/naturaprocess',
        code: 'naturaprocess',
        name: 'Natura Process List',
        component: './natura/ProcessBatch',
      },
    ],
  },
  {
    path: '/report',
    code: 'report',
    name: 'Report',
    icon: 'printer',
    routes: [
      {
        path: '/report',
        redirect: '/report/recon',
      },
      {
        path: '/report/perincian',
        code: 'reportperincian',
        name: 'Report Perincian',
        component: './report/Perincian',
      },
      {
        path: '/report/penghasilan',
        code: 'reportpenghasilan',
        name: 'Report Penghasilan',
        component: './report/Penghasilan',
      },
      {
        path: '/report/recon',
        code: 'reportrecon',
        name: 'Report Reconciliation',
        component: './report/Recon',
      },
      {
        path: '/report/dppn',
        code: 'reportdppn',
        name: 'Report DPPN',
        component: './report/DPPN',
      },
      {
        path: '/report/dtppn',
        code: 'reportdtppn',
        name: 'Report DTPPN',
        component: './report/DTPPN',
      },
      {
        path: '/report/dippn',
        code: 'reportdippn',
        name: 'Report DIPPN',
        component: './report/DIPPN',
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
