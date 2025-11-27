import { defineNuxtPlugin } from '#app'
import { Chart as ChartJS, registerables } from 'chart.js'

let registered = false

export default defineNuxtPlugin(() => {
  if (!registered) {
ChartJS.register(...registerables)
    registered = true
  }
})
