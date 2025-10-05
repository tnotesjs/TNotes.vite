import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  debugger
  console.log(command, mode, isSsrBuild, isPreview)
  return {}
})
