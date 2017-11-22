import {Predicate} from "./predicate";
import {PredicateType} from "./predicateTypes";
import {Attribute} from "./attributes/attribute";

export class NotPredicate extends Predicate {
    private name: string = 'Not';

    private attribute: Attribute;

    constructor(attribute: Attribute) {
        super(PredicateType.not);
        this.attribute = attribute;
    }

    toJson() {
        return {
            type: this.predicateType,
            attribute: this.attribute.toJson()
        }
    }

    static getDescriptor() {
        return {
            name: 'Is Not',
            type: PredicateType.not
        }
    }

}