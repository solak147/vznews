<template>
  <div>
    <NuxtLayout>
      <main>
        <NuxtPage />
      </main>
      <template #header>
        <CptHeader></CptHeader>
      </template>
      <template #footer> </template>
    </NuxtLayout>
  </div>
</template>

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
