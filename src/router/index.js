import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/userLists",
    name: "userLists",
    component: () => import("../views/userList/userList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (await getCurrentUser()) {
//       next();
//     } else {
//       next("/");
//     }
//   } else {
//     next();
//   }
// });

export default router;
