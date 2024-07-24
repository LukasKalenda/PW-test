import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/index.vue";

import ArticleList from '../components/ArticleList.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import ArticleEditor from '../components/ArticleEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      name: 'articleEditor',  // Přidáno jméno route
      component: ArticleEditor 
    }
  ],
});

export default router;