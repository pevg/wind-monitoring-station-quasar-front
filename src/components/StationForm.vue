<template>
    <div class="q-ml-md">
        <div class="row">
            <h5>{{title}}</h5>
        </div>
        <div class="row justify-center">
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="col justify-center"
                style="max-width: 500px"
            >
                <div class="row q-mb-lg justify-center">
                    <div class="col-10">
                        <q-input
                            filled
                            dense
                            v-model="formValues.title"
                            label="Ingrese nombre de la estación"
                            hint="Nombre"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Debe Ingresar un Nombre']"
                        />
                    </div>
                </div>
                <div class="row q-mb-lg justify-center">
                    <div class="col-10">
                        <q-input
                            filled
                            v-model="formValues.description"
                            label="Ingrese descripción de la estación"
                            type="textarea"
                            hint="Descipción"	
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Debe Ingresar una Descripción']"
                        />
                    </div>
                </div>
                <div class="row q-mb-lg justify-center">
                    <div class="col-10">
                        <q-input
                            filled
                            dense
                            v-model="formValues.location"
                            label="Ingrese ubicación"
                            hint="Ubicación"
                        />
                    </div>
                </div>
                <div class="row q-mb-lg justify-center">
                    <div class="col-10">
                        <q-input
                            filled
                            dense
                            v-model="formValues.serverIP"
                            label="Ingrese IP del Servidor"
                            hint="Server IP"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Debe Ingresar una IP']"
                        />
                  </div>
                </div>
                <div class="row q-mb-lg justify-center">
                    <div class="col-10">
                        <q-input
                            filled
                            dense
                            v-model="formValues.subscription_topic"
                            label="Ingrese Topic de Subscripción"
                            hint="Topic de Subscripción"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Debe Ingresar un Topic de Subscripción']"
                        />
                  </div>
                </div>
                <div class="row q-mb-lg justify-center">
                    <div class="col-10">
                        <q-input
                            filled
                            dense
                            v-model="formValues.publish_topic"
                            label="Ingrese Topic de Publicación"
                            hint="Topic de Publicación"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Debe Ingresar un Topic de Publicación']"
                        />
                  </div>
                </div>              
                <div class="row q-mb-lg justify-center q-mt-xl">
                  <q-btn label="Registrar" type="submit" color="primary" class="q-mr-md"/>
                  <q-btn label="volver" type="button" color="secondary" @click="goBack()" class="q-mr-md"/>
                  <q-btn v-if="props.type === 'edit'" label="Eliminar" type="button" color="negative" @click="deleteStation()"/>
                  <q-btn v-if="props.type !== 'edit'" label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
          
          </q-form>
        </div>
    </div>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import StationService from 'src/services/station';

    const station = ref({})

    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
        title: {
            default: 'Form Title',
            type: String,
            required: true
        },
        type:{
            default: 'register',
            type: String
        },
        id: {
            default: '',
            type: String,
        }
    })

    const formValues = ref({
        title: '',
        description: '',
        location: '',
        serverIP: '',
        subscription_topic: '',
        publish_topic: ''
    })
    
    onBeforeMount( async() => {
        const response = await StationService.getStationById(route.params.id);
        station.value = response.data;
        setInitValues()
    })

    const onReset = () => {
        formValues.value = {
            title: '',
            description: '',
            location: '',
            serverIP: '',
            subscription_topic: '',
            publish_topic: ''
        }
    }

    const onSubmit = async() => {
        switch (props.type) {
            case 'register':
                try {
                    const response = await StationService.createStation(formValues.value)
                    if(response.status == 200){
                        router.push('/')
                    }else{
                        console.log('Error')
                    }
                    
                } catch (error) {
                   console.log('Error') 
                } 
                break;
            case 'edit':
                StationService.updateStation(station.value._id, formValues.value)
                break;
        }
        

    }

    const goBack = ()=> {
        router.go(-1)
    }

    const deleteStation = async() => {
        if(!confirm('¿Esta seguro que desea eliminar esta estación?') ){
            return
        }else{
            await StationService.deleteStation(station.value._id);
            router.push('/');
        }
    }

    const setInitValues = () => {
        switch (props.type) {
            case 'register':
                onReset()
                break;
            case 'edit':
                formValues.value = {
                    title: station.value.title,
                    description: station.value.description,
                    location: station.value.location,
                    serverIP: station.value.serverIP,
                    subscription_topic: station.value.subscription_topic,
                    publish_topic: station.value.publish_topic
                }
        }
    }





</script>

<style lang="scss" scoped>

</style>