<template>
    <div class="q-mt-lg q-ml-lg q-mb-xl">
        <h5>{{station.title}}</h5>
        <p>{{station.description}}</p>
    </div>
    <div class="row">
        <div class="col q-ml-lg">
            <q-icon name="lens" :color="station.status === true ? 'green' : 'red'" class="q-mr-sm"></q-icon>
            <strong>Estatus: </strong> {{ station.status ? 'Online' : 'Offline' }}
        </div>
    </div>
    <div class="row">
        <div class="col q-ml-lg q-mt-lg">
            <q-icon name="air" class="q-mr-sm"></q-icon>
            <strong>Velocidad: </strong> {{ windProperties.velocity }}
        </div>
    </div>
    <div class="row">
        <div class="col q-ml-lg q-mt-lg">
            <q-icon name="merge" class="q-mr-sm"></q-icon>
            <strong>Dirección: </strong> {{ windProperties.direction }}
        </div>
    </div>
    <div class="row">
        <div class="col q-ml-lg q-mt-lg">
            <q-btn 
                label="Conectar" 
                type="button" 
                color="primary"
                @click="connect()"
            />
            <q-btn 
                label="Editar" 
                type="reset" 
                color="primary" 
                flat 
                class="q-ml-sm"
                @click="editStation()"
            />
        </div>
    </div>
</template>

<script setup>

    import { onBeforeMount, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import StationService from 'src/services/station';
    import WebSocketService from 'src/services/websocket';
    const ws = ref(null)

    const route = useRoute()
    const router = useRouter();
    const station = ref({})
    const windProperties = ref({
        velocity: 0,
        direction: '-'
    })

    onBeforeMount( async () => {
        const response = await StationService.getStationById(route.params.id);
        station.value = response.data;
        ws.value = new WebSocketService('ws://localhost:3000', station.value.subscription_topic, messageCallback);
    })

    const messageCallback = (data) => {
        const message = JSON.parse(data);
        message.velocity ? windProperties.value.velocity = message.velocity : "N/R"
        message.direction ? windProperties.value.direction = message.direction : "N/R"
        console.log(message);
    }

    const editStation = () => {
        router.push({path: `/edit/${station.value._id}`})
    }

    const connect = () => {
        const payload = {
            server: station.value.serverIP,
            subscription_topic: station.value.subscription_topic,
            publish_topic: station.value.publish_topic
        }
        ws.value.enviarMensaje("config",payload)
        station.value.status = true
    }

</script>

<style lang="scss" scoped>

</style>