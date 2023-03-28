<template>
  <div>
    <NuxtLayout>
      <main>
        <NuxtPage />
      </main>
      <template #header>
        <CptHeader></CptHeader>
      </template>
      <template #footer>
        <p>這段會放置在 footer 插槽</p>
      </template>
    </NuxtLayout>
  </div>
</template>
