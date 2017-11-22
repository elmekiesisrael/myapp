import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";

export class OrPredicate extends Predicate {
    private name: string = 'Or';
    private first: Predicate;
    private second: Predicate;

    constructor(first: Predicate, second: Predicate) {
        super(PredicateType.or);
        this.first = first;
        this.second = second;
    }

    toJson() {
        return {
            type: this.predicateType,
            first: this.first.toJson(),
            second: this.second.toJson()
        }
    }

    static getDescriptor() {
        return {
            name: 'Or',
            type: PredicateType.or
        }
    }
}