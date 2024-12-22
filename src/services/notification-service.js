let instance = null;
let observers = {};

export const movePlayed = "movePlayed"
export const winMove = "winMove"

export default class NotificationService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    postNotification = (notificationName, data) => {
        let obs = observers[notificationName];
        obs.forEach(observer => observer.callback(data));
    }

    addObserver = (notificationName, observer, callback) => {
        let obs = observers[notificationName];

        if (!obs) {
            observers[notificationName] = [];
        }

        const obj = { observer, callback };
        observers[notificationName].push(obj)
    }

    removeObserver = (notificationName, observer) => {
        let obs = observers[notificationName];
        obs.notificationName?.filter(item => item !== observer)
    }

}