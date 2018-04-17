export default class DataProvider {
    constructor(values, delay = 0) {
        this.entries = values.map(value => [value.toLowerCase(), value]);
        this.delay = delay;
    }

    search(query, limit) {
        return new Promise(function (resolve, reject) {
            if (typeof query !== 'string') {
                reject('Wrong query, must be a string');
            }

            if (isNaN(this.delay) || this.delay < 0) {
                reject('Wrong delay value, must be positive number');
            }

            const normalizedQuery = query.toLowerCase();

            const results =
                this.entries
                    .filter(entry => entry[0].indexOf(normalizedQuery) !== -1) // filtering normalized values
                    .map(entry => entry[1]) // returning original values
                    .slice(0, limit); // applying limits

            setTimeout(resolve, this.delay, results);
        }.bind(this));
    }
}
