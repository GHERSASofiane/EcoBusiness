export class Reponse {
    constructor(
        public status: string,
        public message: string,
        public token?: string,
        public reponse?: any
    ){}
}