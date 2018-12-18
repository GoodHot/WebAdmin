import spider from './pages/Spider';
import approval from './pages/Approval';
import category from './pages/Category';
import task from './pages/Task';


const routes = [
  { path: '/', component: spider },
  { path: '/approval', component: approval },
  { path: '/category', component: category },
  { path: '/task', component: task },
]

export default routes