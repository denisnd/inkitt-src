export default class DataProvider {
	constructor(values) {
		this.entries = values.map(value => [value.toLowerCase(), value]);
	}

	search(query, limit, delay = 0) {
		const normalizedQuery = query.toLowerCase();

		let results =
			this.entries
				.filter((entry) => entry[0].indexOf(normalizedQuery) != -1) // filtering normalized values
				.map((entry) => entry[1]) // returning original values
				.slice(0, limit); // applying limits

		return new Promise(function(resolve, reject) {
			if (isNaN(delay) || delay < 0) reject("Wrong delay value, must be positive number");

			setTimeout(resolve, delay, results);
		});
	}
}