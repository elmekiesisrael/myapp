import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";
import {Attribute} from "./attributes/attribute";

export class EqualsPredicate extends Predicate {
    private key: string;
    private attribute: Attribute;

    constructor(key: string, attribute: Attribute) {
        super(PredicateType.equals);
        this.key = key;
        this.attribute = attribute;
    }

    toJson() {
        return {
            type: this.predicateType,
            key: this.key,
            attribute: this.attribute.toJson()
        };
    }

    static getDescriptor() {
        return {
            name: 'Equals',
            type: PredicateType.equals
        }
    }
}