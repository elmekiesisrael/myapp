import {PredicateType} from "../predicateTypes";
import {Attribute} from "./attribute";

export class BooleanAttribute extends Attribute {

    constructor(value: boolean) {
        super(PredicateType.boolAttr);
        this.value = value;
    }

    toJson() {
        return {
            type: this.predicateType,
            value: this.value
        };
    }
}