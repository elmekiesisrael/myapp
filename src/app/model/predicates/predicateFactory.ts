import {TruePredicate} from "./truePredicate";
import {Attribute} from "./attributes/attribute";
import {NotPredicate} from "./notPredicate";
import {EqualsPredicate} from "./equalsPredicate";
import {GreaterThenPredicate} from "./greaterThenPredicate";
import {LessThenPredicate} from "./lessThenPredicate";
import {DatePredicate} from "./datePredicate";
import {StringAttribute} from "./attributes/stringAttribute";
import {IntAttribute} from "./attributes/intAttribute";
import {FloatAttribute} from "./attributes/floatAttribute";
import {Predicate} from "./predicate";
import {OrPredicate} from "./orPredicate";
import {AndPredicate} from "./andPredicate";
import {PredicateType} from "./predicateTypes";
import {IDPredicate} from "./idPredicate";
import {Debugger} from "../../services/debugger/debugger";

export class PredicateFactory {
    static getPredicate(type: PredicateType, key: string, attribute: Attribute, dateFrom: number, dateTo: number, id: string): Predicate {
        switch (type) {
            case PredicateType.true:
                return new TruePredicate(key);
            case PredicateType.not:
                return new NotPredicate(attribute);
            case PredicateType.id:
                return new IDPredicate(id);
            case PredicateType.equals:
                return new EqualsPredicate(key, attribute);
            case PredicateType.greaterThen:
                return new GreaterThenPredicate(key, attribute);
            case PredicateType.lessThen:
                return new LessThenPredicate(key, attribute);
            case PredicateType.date:
                return new DatePredicate(dateFrom, dateTo);
        }
    }


    static getAttribute(type: PredicateType, value: string): Attribute {
        Debugger.debug('PredicateFactory.getAttribute() - Returning a new attribute by type and value');
        switch (type) {
            case 'date':
            case 'string':
                return new StringAttribute(value);
            case 'float':
                return new FloatAttribute(Number(value));
            case 'id':
            case 'int':
                return new IntAttribute(Number(value));
        }
    }


    static getAllPredicateTypes() {
        Debugger.debug('PredicateFactory.getAllPredicateTypes() - Returning list of all predicate types.');
        return [
            TruePredicate.getDescriptor(),
            NotPredicate.getDescriptor(),
            EqualsPredicate.getDescriptor(),
            LessThenPredicate.getDescriptor(),
            GreaterThenPredicate.getDescriptor(),
            IDPredicate.getDescriptor(),
            DatePredicate.getDescriptor()
        ];
    }


    static getPredicatesByType(type: PredicateType) {
        Debugger.debug('PredicateFactory.getPredicatesByType() - Returning list of all predicate by a given type.');
        switch (type) {
            case PredicateType.true:
                return [TruePredicate.getDescriptor()];
            case PredicateType.boolAttr:
                return [
                    TruePredicate.getDescriptor(),
                    EqualsPredicate.getDescriptor(),
                    NotPredicate.getDescriptor(),
                    TruePredicate.getDescriptor()
                ];
            case PredicateType.floatAttr:
            case PredicateType.intAttr:
                return [
                    TruePredicate.getDescriptor(),
                    EqualsPredicate.getDescriptor(),
                    GreaterThenPredicate.getDescriptor(),
                    LessThenPredicate.getDescriptor(),
                    NotPredicate.getDescriptor()
                ];
            case PredicateType.strAttr:
                return [
                    TruePredicate.getDescriptor(),
                    EqualsPredicate.getDescriptor(),
                    NotPredicate.getDescriptor()
                ];
            case PredicateType.date:
                return [
                    TruePredicate.getDescriptor(),
                    DatePredicate.getDescriptor()
                ];
            case PredicateType.id:
                return [
                    TruePredicate.getDescriptor(),
                    IDPredicate.getDescriptor()
                ];
        }
    }

    static getLogicalOperatorPredicate(type: PredicateType, first: Predicate, second: Predicate) {
        Debugger.debug('PredicateFactory.getLogicalOperatorPredicate() - Returning logical predicate.');

        if (type === PredicateType.or) {
            return new OrPredicate(first, second);
        }

        if (type === PredicateType.and) {
            return new AndPredicate(first, second);
        }

        return null;
    }


    static getOperations() {
        Debugger.debug('PredicateFactory.getOperations() - Returning list of logical predicates descriptors');
        return [
            AndPredicate.getDescriptor(),
            OrPredicate.getDescriptor()
        ]
    }


}