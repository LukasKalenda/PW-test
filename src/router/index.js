import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from "../views/index.vue";
import ArticleList from '../components/ArticleList.vue';
import ArticleDetail from '../components/ArticleDetail.vue';
import ArticleEditor from '../components/ArticleEditor.vue';
import Login from '../components/Login.vue';
import AdminMessages from '@/components/AdminMessages.vue'
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/kontakt",
    name: "contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: '/article/:slug',
    name: 'articleDetail',
    component: ArticleDetail
  },
  { 
    path: '/editor', 
    name: 'articleEditor',
    component: ArticleEditor,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/clanky',
    name: 'articleList',
    component: ArticleList
  },
  {
    path: '/admin/messages',
    name: 'adminMessages',
    component: AdminMessages,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  
  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next('/login');
      }
    });
  } else {
    next();
  }
});

export default router;