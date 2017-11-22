import {PredicateType} from "./predicateTypes";

export abstract class Predicate {

    protected predicateType: PredicateType;

    constructor(PredicateType: PredicateType) {
        this.predicateType = PredicateType;
    }

    abstract toJson();
}