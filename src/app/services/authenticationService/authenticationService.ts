import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()

export class AuthenticationService {

    constructor(private http: Http) {

    }

    authenticate(token: string) {
        if (token === '1234') {
            return true;
        }

        return false;
    }

}