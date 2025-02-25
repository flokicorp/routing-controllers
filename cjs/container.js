"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromContainer = exports.useContainer = void 0;
/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
const defaultContainer = new (class {
    constructor() {
        this.instances = [];
    }
    get(someClass) {
        let instance = this.instances.find(instance => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    }
})();
let userContainer;
let userContainerOptions;
/**
 * Sets container to be used by this library.
 */
function useContainer(iocAdapter, options) {
    userContainer = iocAdapter;
    userContainerOptions = options;
}
exports.useContainer = useContainer;
/**
 * Gets the IOC container used by this library.
 * @param someClass A class constructor to resolve
 * @param action The request/response context that `someClass` is being resolved for
 */
function getFromContainer(someClass, action) {
    if (userContainer) {
        try {
            const instance = userContainer.get(someClass, action);
            if (instance)
                return instance;
            if (!userContainerOptions || !userContainerOptions.fallback)
                return instance;
        }
        catch (error) {
            if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
                throw error;
        }
    }
    return defaultContainer.get(someClass);
}
exports.getFromContainer = getFromContainer;
//# sourceMappingURL=container.js.map