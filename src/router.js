import spider from './components/Spider';
import approval from './components/Approval';
import category from './components/Category';


const routes = [
  { path: '/', component: spider },
  { path: '/approval', component: approval },
  { path: '/category', component: category }
]

export default routes