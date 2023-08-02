<template>
  <div class="row">
    <station-card 
      v-for="station in stations"
      :key="station.id"
      :id="station.id"
      :title="station.title"
      :description="station.description"
      :status="station.status"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import StationCard from 'src/components/StationCard.vue';
import StationService from 'src/services/station';

const stations = ref({})

onBeforeMount(async() => {
  
  const response = await StationService.getStations();
  stations.value = response.data.stations
})

</script>



<style lang="scss" scoped>


</style>