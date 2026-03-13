import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/overview'
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('../views/OverviewView.vue')
  },
  {
    path: '/pull-requests',
    name: 'PrList',
    component: () => import('../views/PrListView.vue')
  },
  {
    path: '/developers',
    name: 'Developers',
    component: () => import('../views/DeveloperView.vue')
  },
  {
    path: '/insights',
    name: 'Insights',
    component: () => import('../views/InsightView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
