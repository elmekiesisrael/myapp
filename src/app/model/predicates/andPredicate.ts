import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";

export class AndPredicate extends Predicate {
    private first: Predicate;
    private second: Predicate;

    constructor(first: Predicate, second: Predicate) {
        super(PredicateType.and);
        this.first = first;
        this.second = second;
    }

    toJson() {
        return {
            type: this.predicateType,
            first: this.first.toJson(),
            second: this.second.toJson()
        };
    }

    static getDescriptor() {
        return {
            name: 'And',
            type: PredicateType.and
        }
    }
}