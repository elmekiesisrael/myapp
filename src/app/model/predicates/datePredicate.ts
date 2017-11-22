import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";

export class DatePredicate extends Predicate {
    private first: number;
    private second: number;

    constructor(first: number, second: number) {
        super(PredicateType.date);
        this.first = first;
        this.second = second;
    }

    toJson() {
        return {
            type: this.predicateType,
            first: this.first,
            second: this.second
        }
    }

    static getDescriptor() {
        return {
            name: 'Between',
            type: PredicateType.date
        }
    }
}