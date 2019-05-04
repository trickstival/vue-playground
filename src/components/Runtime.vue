<template>
    <main class="runtime">
        <pre v-if="currentError" class="errorMessage">
            {{currentError && currentError.stack}}
        </pre>
        <component v-else :is="theComponent" />
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
    data () {
        return {
            currentError: ''
        }
    },
    computed: {
        theComponent () {
            const jsonString = `({${this.script}})`.replace(/'/g, '"')
            const component = eval(jsonString)
            component.template = this.template

            let builtComp = Vue.extend(component)
            return builtComp
        },
        code () {
            return {
                template: this.template,
                script: this.script
            }
        }
    },
    watch: {
        code: {
            deep: true,
            handler () {
                this.currentError = ''
            }   
        }
    },
    errorCaptured (err, vm, info) {
        console.log('error captured', err)
        this.currentError = err
    }
}
</script>

<style scoped lang="scss">
.runtime {
    background-color: #f5f2f0;
    height: 79vh;
}
.errorMessage {
    color: red;
}
</style>
