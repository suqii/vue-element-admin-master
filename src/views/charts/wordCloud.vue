<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import chart from '@/components/Charts/WordCloudChart'

export default {
  name: 'WordCloudChart',
  components: { chart },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

