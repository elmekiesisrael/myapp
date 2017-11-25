import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {PredicateType} from "../../model/predicates/predicateTypes";
import 'rxjs/add/operator/map';
import {Predicate} from "../../model/predicates/predicate";
import {Observable} from "rxjs";

@Injectable()
export class MetricsService {

    constructor(private http: Http) { }

    calculateMetric(predicate: Predicate) {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: new Headers()});
        return this.http.post(`http://localhost:8080/orm/user/metrics/calculate`, JSON.stringify(predicate), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getAllShallowMetricsList() {
        return this.http.get(`http://localhost:8080/orm/user/metrics/shallow-list`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getMetricById(id) {
        return this.http.get(`http://localhost:8080/orm/user/metrics/id/` + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDefaultMetric() {
        return {
            type: 'regular',
            spreadBy: undefined,
            title: 'Enter Your Metric Name Here',
            request: '',
            lastResult: '',
            lastResultDate: '',
            id: '99234099fg44f343239', //generate ID here
            segments:
                [
                    {
                        predicates: [
                            {type: undefined, key: undefined, value: {type: undefined, value: undefined} }
                        ],
                        operator: PredicateType.or
                    }
                ],
            opsBetweenSegments: []
        };
    }

}