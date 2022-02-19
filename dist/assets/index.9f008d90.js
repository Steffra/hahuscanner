import { r as s, c as a, a as e, b as o, o as n, d as r, e as t, f as c } from './vendor.dc23aa63.js'
var m = { name: 'Home' }
const p = { class: 'font-poppins flex min-h-screen' },
    i = { class: 'w-full' },
    u = o(' asd ')
m.render = function (o, r, t, c, m, d) {
    const f = s('router-view')
    return n(), a('div', p, [e('main', i, [e(f, { key: o.$route.path }), u])])
}
const d = [{ path: '/', name: 'Home', component: {} }],
    f = r({ history: t(), routes: d })
c(m).use(f).mount('#app')
