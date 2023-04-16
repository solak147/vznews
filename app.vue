<template>
  <div>
    <NuxtLayout>
      <main>
        <NuxtPage :nav-active="callNavActive" />
      </main>
      <template #header>
        <CptHeader ref="cptHeader" />
      </template>
      <template #footer> </template>
    </NuxtLayout>
  </div>
</template>

<script setup>
const cptHeader = ref(null)

const callNavActive = (index) => {
  cptHeader.value?.navActiveFn(index)
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
