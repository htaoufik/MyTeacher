export class TimeSlot {
    /**
     * Constructor initiates a new teacher
     *
     * @param {number} id
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} from
     * @param {string} to
     * @param {string} thumbnail
     */
    constructor (
        public id: number,
        public firstName: string,
        public lastName: string,
        public from: string,
        public to: string,
        public thumbnail: string
    ) { }
}
