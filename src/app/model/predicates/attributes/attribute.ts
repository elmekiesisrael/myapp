import {Predicate} from "../predicate";

export abstract class Attribute extends Predicate {

    protected value: any;

    getValue() {
        return this.value;
    }

    getDescriptor() {
        return {
            name: 'Predicate',
            type: undefined
        }
    }
}