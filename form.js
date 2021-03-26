const Form = newComponentModel({
    id: '',

    onCreate () {

        const data = newState({
            name: null
        })

        handleEvents.setListener('documentReady', () => {
            document.querySelector(`#${this.id} #btnSubmit`)
                .addEventListener('click', (event) => {
                    event.preventDefault()
                    this.handleSubmit(data.value)
                })

            document.addEventListener('change', (event) => {
                if (!event.target.matches(`input`)) return
                const field = event.target
                data.value = { ...data.value, [field.name]: field.value }
            })
        })
    },

    template () {
        return `
            <form id="${this.id}">
                ${new Input({ id: 'name', lable: 'Nome' }).template()}
                <button id="btnSubmit" type="submit">Submit</button>
            </form>
        `
    }
})