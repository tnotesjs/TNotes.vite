import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import b from '@/a/b.ts'
import { sum } from '#/sum'

console.log(b)
const getSum: sum = (n1, n2) => n1 + n2
console.log(getSum(1, 2)) // 3

createApp(App).mount('#app')
