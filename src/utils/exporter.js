export const toSFC = ({ script, style, template }) => {
    return `
        <template>
            ${template}
        </template>
        <script>
            ${script}
        </script>
        <style>
            ${style}
        </style>
    `
}


const downloader = document.createElement('a')
export const downloadSFC = (code, filename = 'My Component') => {
    const text = toSFC(code)

    downloader.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    downloader.setAttribute('download', `${filename}.vue`)
    downloader.style.display = 'none'
    document.body.appendChild(downloader)
    downloader.click()
    document.body.removeChild(downloader)
}