import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contact } from "./contact";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    API_SERVER = "https://nest-contact.onrender.com";

    constructor(private httpClient: HttpClient) {}

    public readContacts() {
        return this.httpClient.get<Contact[]>(`${this.API_SERVER}/contacts`);
    }

    public createContact(contact: Contact) {
        return this.httpClient.post<Contact>(
            `${this.API_SERVER}/contacts/create`,
            contact
        );
    }

    public updateContact(contact: Contact) {
        return this.httpClient.put<Contact>(
            `${API_SERVER}/contacts/${contact.id}/update`,
            contact
        );
    }

    public deleteContact(id: number) {
        return this.httpClient.delete(`${API_SERVER}/contacts/${id}/delete`);
    }
}
