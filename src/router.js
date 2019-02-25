import layout from './pages/layout/Layout';
import loginLayout from './pages/layout/Login';
import login from './pages/Login';
import spider from './pages/Spider';
import approval from './pages/Approval';
import category from './pages/Category';
import task from './pages/Task';
import story from './pages/Story';
import storyAdd from './pages/StoryAdd';
import collect from './pages/Collect';
import collectAdd from './pages/CollectAdd';
import admin from './pages/Admin';
import post from './pages/Post';
import user from './pages/User';


const routes = [
  {
    path: '/',
    component: layout,
    children: [
      { path: '/', component: spider },
      { path: 'approval', component: approval },
      { path: 'category', component: category },
      { path: 'task', component: task },
      { path: 'story', component: story },
      { path: 'story/add', component: storyAdd },
      { path: 'collect', component: collect },
      { path: 'collect/add', component: collectAdd },
      { path: 'admin', component: admin },
      { path: 'post', component: post },
      { path: 'user', component: user },
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