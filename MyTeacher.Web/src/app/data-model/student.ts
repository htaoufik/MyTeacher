export class Student {
    /**
     * Constructor initiates a new student
     *
     * @param {number} id
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} instrument
     * @param {string} thumbnail
     * @param {string} picture
     */
    constructor (
        public id: number,
        public firstName: string,
        public lastName: string,
        public instrument: string,
        public thumbnail: string = '',
        public picture: string = ''
    ) { }
}
