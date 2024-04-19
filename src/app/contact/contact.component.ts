import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Contact } from "../contact";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
    displayedColumns: string[] = [
        "id",
        "name",
        "title",
        "email",
        "phone",
        "address",
        "city",
        "actions"
    ];
    dataSource = [];
    contact = {};
    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.apiService.readContacts().subscribe(result => {
            this.dataSource = result;
        });
    }
    selectContact(contact) {
        this.contact = contact;
    }

    newContact() {
        this.contact = {};
    }

    createContact(f) {
        return this.apiService.createContact(f.value).subscribe(result => {
            console.log(result);
        });
    }

    deleteContact(id) {
        return this.apiService.deleteContact(id).subscribe(result => {
            console.log(result);
        });
    }

    updateContact(f) {
        f.value.id = this.contact["id"];
        return this.apiService.updateContact(f.value).subscribe(result => {
            console.log(result);
        });
    }
}
