import UserTrades from "../views/UserTrades.vue"
import Settings from "../views/Settings.vue"

export default [
  {
    path: "/:username",
    name: "UserTrades",
    component: UserTrades,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    }
  }
]
