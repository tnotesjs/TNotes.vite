<script setup lang="ts">
const modules = import.meta.glob(['./modules-1/*.ts', './modules-2/*.ts',], { eager: true }) as Record<string, any>
console.log(modules)
// {
//     "./modules-1/1.ts": {
//         "a": 1,
//         "default": 1
//     },
//     "./modules-1/2.ts": {
//         "b": 2,
//         "default": 2
//     },
//     "./modules-1/3.ts": {
//         "c": 3,
//         "default": 3
//     },
//     "./modules-2/1.ts": {
//         "a": 11,
//         "default": 11
//     },
//     "./modules-2/2.ts": {
//         "b": 22,
//         "default": 22
//     },
//     "./modules-2/3.ts": {
//         "c": 33,
//         "default": 33
//     }
// }

const myModules: any[] = []
Object.keys(modules).forEach((key) => {
  console.log(key)
  // ./modules-1/1.ts
  // ./modules-1/2.ts
  // ./modules-1/3.ts
  // ./modules-2/1.ts
  // ./modules-2/2.ts
  // ./modules-2/3.ts


  myModules.push(modules[key].default)
})
</script>

<template>
  <h1>modules</h1>
  <h2>{{ myModules }}</h2>
</template>
