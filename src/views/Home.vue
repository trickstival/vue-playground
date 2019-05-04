<template>
  <div class="home">
    <header class="code-header">
      <editor v-model="code.template" language="html">
        &lt;Template&gt;
      </editor>
      <editor v-model="code.script" language="javascript">
        { Script }
      </editor>
      <editor v-model="code.style" language="css">
        .Style (under development)
      </editor>
    </header>
    <button @click="exportSFC">
      Export SFC
    </button>
    <runtime :template="code.template" :script="code.script" />
  </div>
</template>

<script>
import Editor from "@/components/Editor"
import Runtime from "@/components/Runtime"
import { downloadSFC } from '@/utils/exporter'

export default {
  name: "home",
  components: {
    Editor,
    Runtime
  },
  data() {
    return {
      code: {
        template: "<h1>{{ test }}</h1>",
        style: "",
        script: `data () {
  return {
    test: 'welcome'
  }
}`
      }
    }
  },
  methods: {
    exportSFC () {
      downloadSFC(this.code)
    }
  }
}
</script>
<style lang="scss" scoped>
.code-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
}
</style>
