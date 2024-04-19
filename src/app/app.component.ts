import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { EmailService } from "./email.service";
import { HttpResponse } from "@angular/common/http";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "Mail-flip Seervices";
    contactForm: FormGroup;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    successMessage: string = "";
    showForm: boolean = true;
    selectedFile: File | null = null;

    constructor(
        private fb: FormBuilder,
        private emailService: EmailService
    ) {
        this.contactForm = this.fb.group({
            name: ["", Validators.required],
            subject: ["", Validators.required],
            email: [
                "",
                [Validators.required, Validators.pattern(this.emailPattern)]
            ],
            message: ["", Validators.required]
        });
    }
}
