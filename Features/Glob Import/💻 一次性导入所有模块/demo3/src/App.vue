<script setup lang="ts">
const modules = import.meta.glob(['./modules-1/**/*.ts', './modules-2/*.ts',], { eager: true }) as Record<string, any>
console.log('modules:', modules)
// './modules-1/**/*.ts'
// ** 表示匹配任意子目录，它会递归地匹配所有文件。
const myModules: any[] = []
Object.keys(modules).forEach((key) => {
  myModules.push(modules[key].default)
})
</script>

<template>
  <h1>modules</h1>
  <h2>{{ myModules }}</h2>
</template>
