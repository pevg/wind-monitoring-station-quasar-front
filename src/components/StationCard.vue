<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered style="min-width: 30em;">

          <q-card-section horizontal>

            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
              <div class="text-caption text-grey">
                {{ description }}
              </div>
            </q-card-section>

            <q-card-section class="col-6 flex justify-end">
              <q-icon name="wind_power" size="xl"/>
            </q-card-section>

          </q-card-section>

          <q-separator />
    
          <q-card-actions class="justify-center">
            <q-btn class="q-mx-md" flat color="primary" icon="my_location" />
            <span class="text-primary"><strong>Estatus:</strong></span>
            
            <q-btn flat :color="statusColor" icon="lens"></q-btn>
            <q-btn flat color="primary" @click="onShow">
              Ver
            </q-btn>
          </q-card-actions>

        </q-card>
    </div>
</template>

<script setup>
  import { ref } from 'vue';

  const statusColor = ref('')

  const props = defineProps({
    id: {
      default: '',
      type: String,
      required: true
    },
    title: {
      default: '',
      type: String,
      required: true
    },
    description: {
      default: '',
      type: String,
      required: true
    },
    status: {
      default: false,
      type: Boolean,
      required: true
    }
  })
    
  const onShow = async() => {
  }

  statusColor.value = props.status ? 'green' : 'red'




</script>

<style lang="scss" scoped>

</style>