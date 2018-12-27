import layout from './pages/layout/Layout';
import loginLayout from './pages/layout/Login';
import login from './pages/Login';
import spider from './pages/Spider';
import approval from './pages/Approval';
import category from './pages/Category';
import task from './pages/Task';
import collect from './pages/Collect';
import collectAdd from './pages/CollectAdd';
import admin from './pages/Admin';


const routes = [
  {
    path: '/',
    component: layout,
    children: [
      { path: '/', component: spider },
      { path: 'approval', component: approval },
      { path: 'category', component: category },
      { path: 'task', component: task },
      { path: 'collect', component: collect },
      { path: 'collect/add', component: collectAdd },
      { path: 'admin', component: admin },
    ]
  },
  {
    path: '/login',
    component: loginLayout,
    children: [
      {path: 'signin', component: login}
    ]
  }
]

export default routes