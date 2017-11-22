import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";

export class IDPredicate extends Predicate {
    private id: string;

    constructor(id: string) {
        super(PredicateType.id);
        this.id = id;
    }


    toJson() {
        return {
            type: this.predicateType,
            id: this.id
        }
    }

    static getDescriptor() {
        return {
            name: 'ID is',
            type: PredicateType.id
        }
    }
}