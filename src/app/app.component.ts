import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authenticationService/authenticationService";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    @Input()
    private token: string;

    private wasAuthenticationSuccessful: boolean;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.wasAuthenticationSuccessful = false;
    }

    authenticate() {
        this.wasAuthenticationSuccessful = this.authenticationService.authenticate(this.token);
    }
}
