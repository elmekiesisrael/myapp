import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";
import {Attribute} from "./attributes/attribute";

export class LessThenPredicate extends Predicate {
    private key: string;
    private attribute: Attribute;

    constructor(key: string, attribute: Attribute) {
        super(PredicateType.lessThen);
        this.key = key;
        this.attribute = attribute;
    }

    toJson() {
        return {
            type: this.predicateType,
            key: this.key,
            attribute: this.attribute.toJson()
        }
    }

    static getDescriptor() {
        return {
            name: 'Less Than',
            type: PredicateType.lessThen
        }
    }
}