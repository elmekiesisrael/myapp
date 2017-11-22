import {PredicateType} from "../predicateTypes";
import {Attribute} from "./attribute";


export class FloatAttribute extends Attribute {

    constructor(value: number) {
        super(PredicateType.floatAttr);
        this.value = value;
    }

    toJson() {
        return {
            type: this.predicateType,
            value: this.value
        };
    }
}