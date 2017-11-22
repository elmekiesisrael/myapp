import {PredicateType} from "../predicateTypes";
import {Attribute} from "./attribute";

export class StringAttribute extends Attribute {

    constructor(value: string) {
        super(PredicateType.strAttr);
        this.value = value;
    }

    toJson() {
        return {
            type: this.predicateType,
            value: this.value
        };
    }
}