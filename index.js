const { deepFreeze, handleEvents, newState } = Utils()
const { newComponent, newComponentModel, startData, useRef } = Component()


window.addEventListener('DOMContentLoaded', () => {

    const ViewA = newComponent('view-a', {
        implement: View,

        onReady () {
            const button = useRef('button')
            const h2 = useRef('h2')
            const h1 = useRef('h1')

            const { getData, setData, dataEvents } = startData({
                count: 1,
            })

            new Array(
                [h2, 'count', (ele, value) => ele.innerHTML = value],
                [h1, 'name', (ele, value) => ele.innerHTML = value]
            ).forEach(sub => {
                dataEvents.subscribe(sub)
            });

            button.onclick = () => {
                setData('count', getData('count') + 1)
            }
        },

        template ({ title }) {
            return `
                <h1>${title}</h1>
                <h2>0</h2>
                <button type="button">Enviar</button>
            `
        },
    })


    handleEvents.run('documentReady')


    document.querySelector('#app').innerHTML = `
        <view-a title="- View A -"></view-a>
    `

})

