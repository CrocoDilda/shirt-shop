<script setup lang="ts">
import { ref } from "vue"

import Button from "primevue/button"
import "primeicons/primeicons.css"
import IconField from "primevue/iconfield"
import InputIcon from "primevue/inputicon"

const theme = ref()
const value1 = ref()
const visibleRight = ref(false)

function toggleDarkMode() {
  theme.value = document.documentElement.classList.toggle("my-app-dark")
}
</script>

<template>
  <header class="header container">
    <nav class="header--nav">
      <Button
        @click="toggleDarkMode()"
        :icon="`pi pi-${theme ? 'moon' : 'sun'}`"
        variant="text"
        rounded
        aria-label="Filter"
        severity="contrast"
      />

      <IconField class="header--search">
        <InputIcon class="pi pi-search" />
        <InputText v-model="value1" placeholder="Введите название" />
      </IconField>

      <div class="header--inner">
        <Button
          icon="pi pi-shopping-cart"
          @click="visibleRight = true"
          severity="contrast"
          rounded
        />
        <Button
          icon="pi pi-user"
          severity="contrast"
          rounded
          aria-label="Star"
        />
      </div>
    </nav>
    <Drawer
      class="p-sidebar-lg"
      v-model:visible="visibleRight"
      header="Корзина"
      position="right"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Drawer>
  </header>
</template>

<style scoped>
.header {
  --paddin: 20px;
  width: 100%;
  padding-top: var(--paddin);
  padding-bottom: var(--paddin);
}

.header--nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 25px;
}

.header--search {
  justify-self: center;
}

.header--inner {
  display: flex;
  gap: 10px;
}
</style>
