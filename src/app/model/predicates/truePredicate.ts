import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";

export class TruePredicate extends Predicate {
    private key: string;


    constructor(key: string) {
        super(PredicateType.true);
        this.key = key;
    }

    toJson() {
        return {
            type: this.predicateType,
            key: this.key,
            attribute: { type: PredicateType.true }
        }
    }

    static getDescriptor() {
        return {
            name: 'Any',
            type: PredicateType.true
        }
    }
}