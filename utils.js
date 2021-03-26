function Utils () {
    return {

        /**
         * Retorna um objeto imutável
         * @param {Object} obj 
         * @returns 
         */
        deepFreeze (obj) {
            for (let i in obj) {
                if (typeof obj[i] === "object" && obj[i] !== null) {
                    deepFreeze(obj[i])
                }
            }
            return Object.freeze(obj)
        },

        newState (initialValue) {
            return {
                _value: null || initialValue,
                get value () {
                    return this._value
                },
                set value (newValue) {
                    this._value = newValue
                }
            }
        },

        handleEvents: {

            listeners: [],

            setListener (name, callback) {
                this.listeners.push({ name, callback })
            },

            run (eventName, data) {
                for (let listener of this.listeners) {
                    if (listener.name === eventName) {
                        listener.callback(data)
                    }
                }
            }
        }


    }

}