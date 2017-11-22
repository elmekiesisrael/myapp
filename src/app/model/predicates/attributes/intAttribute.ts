import {PredicateType} from "../predicateTypes";
import {Attribute} from "./attribute";

export class IntAttribute extends Attribute {

    constructor(value: number) {
        super(PredicateType.intAttr);
        this.value = value;
    }

    toJson() {
        return {
            type: this.predicateType,
            value: this.value
        };
    }
}