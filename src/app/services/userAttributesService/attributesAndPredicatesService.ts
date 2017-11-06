import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

declare interface Attribute {
    name: string,
    type: string
}

@Injectable()
export class AttributesAndPredicatesService {

    constructor(private http: Http) {}

    getAttributesAndPredicatesTypes() {
        return {
            attributes: [
                { name: 'Boolean', type: 'boolean', possiblePredicates: [1, 3, 4, 8, 9, 10] },
                { name: 'Integer', type: 'int', possiblePredicates: [3, 4, 6, 7, 8, 9, 10] },
                { name: 'Any Number', type: 'float', possiblePredicates: [3, 4, 6, 7, 8, 9, 10] },
                { name: 'Text', type: 'string', possiblePredicates: [2, 3, 4, 5, 8, 9, 10] },
                { name: 'Date', type: 'date', possiblePredicates: [5, 10] },
            ],

            predicates: [
                { id: 1, name: 'Is True' },
                { id: 2, name: 'ID Is' },
                { id: 3, name: 'Equals'},
                { id: 4, name: 'Is Not'},
                { id: 5, name: 'Date Between'},
                { id: 6, name: 'Greater Then'},
                { id: 7, name: 'Less Then'},
                { id: 8, name: 'And'},
                { id: 9, name: 'Or' },
                { id: 10, name: '+'}
            ]
        }
    }


    getUserAttributes() {
        return [
            { name: 'userName', title: 'User Name', type: 'string' },
            { name: 'age', title: 'Age', type: 'int' },
            { name: 'dateCreated', title: 'Created On', type: 'date' },
        ]
    }


}