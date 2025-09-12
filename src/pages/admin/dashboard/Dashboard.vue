<template>
  <div>
    <!-- Tes cards existantes -->
    <div class="grid grid-cols-1 pt-10 md:pt-0 md:grid-cols-3 gap-5">
      <div class="card text-white p-3 rounded-xs h-[150px] bg-blue-950">
        <p>Total Users</p>
        <p class="text-4xl">{{ stats.users }}</p>
      </div>
      <div class="card text-white p-3 rounded-xs h-[150px] bg-slate-600">
        <p>Total Books</p>
        <p class="text-4xl">{{ stats.books }}</p>
      </div>
      <div class="card text-white p-3 rounded-xs h-[150px] bg-yellow-300">
        <p>Total Loans</p>
        <p class="text-4xl">10</p>
      </div>
    </div>

    <div class="w-full h-[400px] mt-10">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../../axios'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const stats = ref({
  books: 0,
  users: 0,
})

const chartRef = ref(null)
let chartInstance = null

const fetchStats = async () => {
  try {
    const response = await api.get('/dashboard-stats')
    stats.value = response.data
  } catch (error) {
    alert('error fetching stats')
  }
}

const fetchChartData = async () => {
  try {
    const response = await api.get('/dashboard-users-by-month')
    const { labels, data } = response.data

    if (chartInstance) {
      chartInstance.destroy()
    }

    chartInstance = new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Users by Month',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    })
  } catch (error) {
    alert('error fetching chart data')
  }
}

onMounted(() => {
  fetchStats()
  fetchChartData()
})
</script>
