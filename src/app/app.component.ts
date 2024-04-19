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

    onSubmit() {
        if (this.contactForm.valid) {
            const formValues = this.contactForm.value;
            console.log("Form submitted with values:", formValues);

            const formData = new FormData();
            formData.append("name", formValues.name);
            formData.append("subject", formValues.subject);
            formData.append("email", formValues.email);
            formData.append("message", formValues.message);

            this.emailService.sendEmail(formData).subscribe({
                next: (response: HttpResponse<any>) => {
                    if (response.ok) {
                        this.successMessage = response.body.message;
                        this.showForm = false;
                        this.clearSuccessMessage();
                        this.selectedFile = null;
                        this.contactForm.reset();
                    }
                },
                error: (error: any) => {
                    console.error("Error sending email:", error);
                }
            });
        } else {
            // Form is invalid, display error messages
            // Additional validation logic or user feedback here
        }
    }

    clearSuccessMessage() {
        setTimeout(() => {
            this.successMessage = "";
            this.showForm = true;
        }, 5000);
    }

    get name() {
        return this.contactForm.get("name");
    }

    get subject() {
        return this.contactForm.get("subject");
    }

    get email() {
        return this.contactForm.get("email");
    }

    get message() {
        return this.contactForm.get("message");
    }
}
