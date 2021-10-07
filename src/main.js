import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import "./index.css"

const app = createApp(App)

store.state.tradesModule;
store.state.loginModule;

app.use(store)
app.use(router)

import Header from "./components/Header.vue"
import Hero from "./components/Hero.vue"
import Footer from "./components/Footer.vue"

import ButtonLogout from "./components/buttons/Logout.vue"
import ButtonSettings from "./components/buttons/Settings.vue"

import TradeHero from "./components/trades_section/TradeHero.vue"
import TradeOpen from "./components//trades_section/TradeOpen.vue"
import TradeClose from "./components/trades_section/TradeClose.vue"
import TradeNew from "./components/trades_section/TradeNew.vue"

import Profile from "./components/settings_section/Profile.vue"
import Password from "./components/settings_section/Password.vue"
import Privacy from "./components/settings_section/Privacy.vue"
import Plans from "./components/plans_section/Plans.vue"
import UpgradeToPremium from "./components/plans_section/UpgradeToPremium.vue"

app.component("Header", Header)
app.component("Hero", Hero)
app.component("Footer", Footer)

app.component("ButtonLogout", ButtonLogout)
app.component("ButtonSettings", ButtonSettings)

app.component("TradeHero", TradeHero)
app.component("TradeOpen", TradeOpen)
app.component("TradeClose", TradeClose)
app.component("TradeNew", TradeNew)

app.component("Profile", Profile)
app.component("Password", Password)
app.component("Privacy", Privacy)
app.component("Plans", Plans)
app.component("UpgradeToPremium", UpgradeToPremium)

app.mount("#app")
