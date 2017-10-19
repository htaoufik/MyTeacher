export class Teacher {
    /**
     * Constructor initiates a new teacher
     *
     * @param {number} id
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} password
     */
    constructor (
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string
    ) { }
}
