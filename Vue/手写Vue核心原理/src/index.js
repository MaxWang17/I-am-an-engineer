import { options } from "_colorette@1.2.1@colorette"
import { initMixin } from "./init"

function Vue(options) {
    this._init(options)
}

initMixin(Vue)

export default Vue