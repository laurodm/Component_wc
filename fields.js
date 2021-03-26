
const Field = newComponentModel({
    id: null,
    lable: null,
    name: null,

    onCreate () {
        /**
         * declara name automaticamente com base no id
         */
        if (this.id && !this.name) this.name = this.id
    },

    template () {
        return `
            <div id="${this.id}" class="fieldWrapper" >
                <lable>${this.lable}</lable>
                ${this.fieldTemplate()}
            </div>
        `
    }
})