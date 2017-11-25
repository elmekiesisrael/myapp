import {PredicateType} from "./predicateTypes";
import {Debugger} from "../../services/debugger/debugger";

export abstract class Predicate {

    protected predicateType: PredicateType;

    constructor(predicateType: PredicateType) {
        this.predicateType = predicateType;
        Debugger.debug('Creating new predicate of type ${predicateType}')
    }

    abstract toJson();
}