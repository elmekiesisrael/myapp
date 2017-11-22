import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AndPredicate} from "../../model/predicates/andPredicate";
import {DatePredicate} from "../../model/predicates/datePredicate";
import {EqualsPredicate} from "../../model/predicates/equalsPredicate";
import {GreaterThenPredicate} from "../../model/predicates/greaterThenPredicate";
import {IDPredicate} from "../../model/predicates/idPredicate";
import {LessThenPredicate} from "../../model/predicates/lessThenPredicate";
import {NotPredicate} from "../../model/predicates/notPredicate";
import {TruePredicate} from "../../model/predicates/truePredicate";
import {PredicateType} from "../../model/predicates/predicateTypes";

declare interface Attribute {
    name: string,
    type: string
}

@Injectable()
export class AttributesAndPredicatesService {

    constructor(private http: Http) {}


    getUserAttributes() {
        return [
            {name: 'id', title: 'ID', type: PredicateType.id},
            {name: 'userName', title: 'User Name', type: PredicateType.strAttr},
            {name: 'age', title: 'Age', type: PredicateType.intAttr},
            {name: 'dateCreated', title: 'Created On', type: PredicateType.date},
            {name: 'address', title: 'Address', type: PredicateType.strAttr},
            {name: 'dateModified', title: 'Last Modified', type: PredicateType.date},
            {name: 'avgEntriesDaily', title: 'Daily Entries on Average', type: PredicateType.floatAttr},
            {name: 'gender', title: 'Gender', type: PredicateType.strAttr},
            {name: 'phoneNumber', title: 'Phone Number', type: PredicateType.intAttr},
            {name: 'siblings', title: 'Siblings', type: PredicateType.intAttr},
            {name: 'spentMoney', title: 'Spent Money?', type: PredicateType.boolAttr},
        ]
    }
}