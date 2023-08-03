<template>
  <div class="row">
    <template v-for="station in stations" :key="station._id">
      <station-card 
        v-if='!station.deleted_at'
        :id="station._id"
        :title="station.title"
        :description="station.description"
        :status="station.status"
        :location="station.location"
        :serverIP="station.serverIP"
        :subscription_topic="station.subscription_topic"
        :publish_topic="station.publish_topic"
      />
    </template>
  </div>
 
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import StationCard from 'src/components/StationCard.vue';
import StationService from 'src/services/station';


const stations = ref({});


onBeforeMount(async() => {
  const response = await StationService.getStations();
  stations.value = response.data
  
})

</script>
 
<style lang="scss" scoped>

</style>