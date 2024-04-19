import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class EmailService {
    constructor(private http: HttpClient) {}

    sendEmail(emailData: any) {
        const endpoint = process.env.BASE_URL;

        return this.http.post(endpoint, emailData, { observe: "response" });
    }
}
