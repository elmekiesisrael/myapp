import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AndPredicate} from "../../model/predicates/andPredicate";
import {DatePredicate} from "../../model/predicates/datePredicate";
import {EqualsPredicate} from "../../model/predicates/equalsPredicate";
import {GreaterThenPredicate} from "../../model/predicates/greaterThenPredicate";
import {IDPredicate} from "../../model/predicates/idPredicate";
import {LessThenPredicate} from "../../model/predicates/lessThenPredicate";
import {NotPredicate} from "../../model/predicates/notPredicate";
import {TruePredicate} from "../../model/predicates/truePredicate";
import {PredicateType} from "../../model/predicates/predicateTypes";
import {Observable} from "rxjs";

declare interface Attribute {
    name: string,
    type: string
}

@Injectable()
export class AttributesAndPredicatesService {

    constructor(private http: Http) {}

    getUserAttributes() {
        return this.http.get(`http://ormeidan.com:8080/orm/user/attributes/list`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}