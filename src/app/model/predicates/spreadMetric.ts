import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";

export class SpreadMetric extends Predicate {
    private spreadBy: string;
    private regularMetric: Predicate;

    constructor(spreadBy: string, regularMetric: Predicate) {
        super(PredicateType.equals);
        this.spreadBy = spreadBy;
        this.regularMetric = regularMetric;
    }

    toJson() {
        return {
            spreadBy: this.spreadBy,
            predicate: this.regularMetric.toJson()
        };
    }

    static getDescriptor() {
        return {
            name: 'Spread By',
            type: PredicateType.spread
        }
    }
}