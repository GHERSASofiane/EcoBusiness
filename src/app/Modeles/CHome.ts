import { Product } from './Product';
import { Characteristics } from './Characteristics';

export class CHOME{
    constructor(
        public idstorage? : number,
        public product? : Product,
        public images? : String[],
        public characteristics? : Characteristics[],
        public like? : Boolean,
        public nombrelike? : number
        ){};
}