import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class DashboardsService {

    constructor(private http: Http) { }

    getUserDashboards(): any {
        return [
            { name: 'Users Dashboard 1' },
            { name: 'Users Dashboard 2' },
            { name: 'Users Dashboard 3' },
            { name: 'Users Dashboard 4' },
            { name: 'Users Dashboard 5' },
        ]
    }


}