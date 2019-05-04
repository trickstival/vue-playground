<template>
    <main class="runtime">
        <component :is="theComponent" />
    </main>
</template>

<script>
import Vue from 'vue'

export default {
    props: {
        template: {
            type: String,
            default: '<h1>{{ test }}</h1>'
        },
        script: {
            type: String,
            default: `data() { return { test: 'testtt' } }`
        }
    },
    computed: {
        theComponent () {
            const jsonString = `({${this.script}})`.replace(/'/g, '"')
            const component = eval(jsonString)
            component.template = this.template
            return Vue.extend(component)
        }
    }
}
</script>

<style scoped lang="scss">
.runtime {
    background-color: grey;
    height: 79vh;
}
</style>
