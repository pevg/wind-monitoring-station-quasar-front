<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Vientos App !
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label>
        <h5 class="q-ml-lg">
          Menú
        </h5>
          
        </q-item-label>

        <MenuItem
          v-for="item in menuItems"
          :key="item.title"
          v-bind="item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuItem from 'src/components/MenuItem.vue'

const menuList = [
  {
    title: 'Inicio',
    caption: '',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Añadir estación',
    caption: '',
    icon: 'air',
    link: 'new'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuItem
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      menuItems: menuList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
