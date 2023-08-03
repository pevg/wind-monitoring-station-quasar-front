<template>
    <station-form
        title="Editar Estacion"
        type="edit"
        :id='route.params.id'
    />
</template>

<script setup>

    import { onBeforeMount, ref } from 'vue'
    import { useRoute } from 'vue-router';
    import StationForm from 'src/components/StationForm.vue';
    import StationService from 'src/services/station';

    const route = useRoute()


</script>

<style lang="scss" scoped>

</style>