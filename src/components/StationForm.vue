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
                            v-model="formValues.subscriptionTopic"
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
                            v-model="formValues.publishTopic"
                            label="Ingrese Topic de Publicación"
                            hint="Topic de Publicación"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Debe Ingresar un Topic de Publicación']"
                        />
                  </div>
                </div>              
                <div class="row q-mb-lg justify-center q-mt-xl">
                  <q-btn label="Registrar" type="submit" color="primary"/>
                  <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
          
          </q-form>
        </div>
    </div>
</template>

<script setup>

    import { ref } from 'vue'	

    const props = defineProps({
        title: {
            default: 'Form Title',
            type: String,
            required: true
        }
    })

    const formValues = ref({
        serverIP: '',
        subscriptionTopic: '',
        publishTopic: ''
    })

    const onReset = () => {
        formValues.value = {
            serverIP: '',
            subscriptionTopic: '',
            publishTopic: ''
        }
    }

</script>

<style lang="scss" scoped>

</style>