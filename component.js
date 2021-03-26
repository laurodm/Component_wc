

function Component () {

    let component
    let attributes = {}

    function createElement (name) {

        class CustomElement extends HTMLElement {
            constructor() {
                super()

                const root = this.attachShadow({ mode: 'open' })

                this.getAttributeNames().forEach(attribute => {
                    attributes[attribute] = this.getAttribute(attribute)
                });

                component.shadowRoot = root

                const _template = document.createElement('template')
                _template.innerHTML = component.template(attributes)
                root.replaceChildren(_template.content.cloneNode(true))
            }

            connectedCallback () {
                component.onReady({ element: this })
            }
        }

        customElements.define(name, CustomElement)
    }

    return {

        /**
         * Cria modelos de componente. 
         * Modelo de componente é um objeto/interface para criação de um novo componente
         * pode ser usado para definir um padrão para um tipo de componente que terá variações
         * Este método retorna um objeto imutável.
         * @param {Object} componentModel 
         * @returns 
         */
        newComponentModel (componentModel) {
            return Object.freeze(componentModel)
        },

        /**
         * Retorna um componentes
         * @param {Object} componentModel Objeto modelo com os parametros de construção do component: 
         * 
         * {
         *  extend: Obj(component) // componente que deve ser extendido
         *  props: {}, // propriedades
         *  methods: {}, // métodos
         *  onCreate: function () {} // callback executado na criação/instanciamento do componente
         *  template: function () {} // função que constroi e retorna o html do componente
         * }
         * 
         * @returns {Object} // component - objeto(classe)
         */
        newComponent (name, componentModel) {

            if (componentModel.implement && typeof componentModel.implement === 'object') {
                componentModel = Object.assign({}, componentModel.implement, componentModel)
            }

            component = { ...componentModel }

            createElement(name)

            if (component.onCreate) component.onCreate.call(component)//parent

            return component
        },

        useRef (selector) {
            return component.shadowRoot.querySelector(selector)
        },

        startData (startValues = {}) {
            const values = startValues

            function getData (name) {
                return values[name]
            }

            function setData (name, newValue) {
                values[name] = newValue
                dataEvents.run({ name, value: values[name] })
            }

            const dataEvents = {
                listeners: [],

                subscribe (sub) {
                    const [ref, dataName, action] = sub
                    this.listeners.push(({ name, value }) => {
                        if (name !== dataName) return
                        action(ref, value)
                    })
                },

                run (data) {
                    for (let listener of this.listeners) {
                        listener(data)
                    }
                }
            }

            return { getData, setData, dataEvents }
        }
    }
}