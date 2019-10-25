import { Characteristics } from './Characteristics';
import { Product } from './Product';

export class MyStorage{
    constructor(
        public idstg? : number,
        public idbrd? : number,
        public prdstg? : Product,
        public carprd? : Characteristics[],
        public likestg? : number[]
        ){};
}