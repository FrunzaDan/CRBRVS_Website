import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { transformIn, transformOut } from '../../animations';
import { SendEmailService } from '../../services/send-email.service';
import { ContactMeForm } from '../../interfaces/contact-me-form';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  animations: [transformIn, transformOut],
})
export class ContactComponent {
  isEmailModalOpen = false;
  emailPopUpHeader = '';
  emailPopUpParagraph = '';
  submitted = false;

  constructor(private sendEmailService: SendEmailService) {}

  contactMeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    from_message: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.contactMeForm.get('name');
  }
  get email() {
    return this.contactMeForm.get('email');
  }
  get from_message() {
    return this.contactMeForm.get('from_message');
  }

  get isNameInvalid(): boolean {
    return !!(this.submitted && this.name?.errors);
  }

  get isEmailInvalid(): boolean {
    return !!(this.submitted && this.email?.errors);
  }

  get isMessageInvalid(): boolean {
    return !!(this.submitted && this.from_message?.errors);
  }

  async onSubmit() {
    this.submitted = true;

    if (this.contactMeForm.invalid) {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.contactMeForm.controls).forEach((key) => {
        const control = this.contactMeForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isEmailModalOpen = true;
    this.emailPopUpHeader = 'Hi, ' + this.contactMeForm.value.name;
    this.emailPopUpParagraph = 'Sending...';

    try {
      const responseCode = await this.sendEmailService.sendEmailJS(
        this.contactMeForm.value as ContactMeForm,
      );

      if (responseCode === 200) {
        this.handleSuccessfulSubmission();
      } else {
        this.handleFailedSubmission(responseCode);
      }
    } catch (error) {
      this.handleFailedSubmission(500);
      console.error('Error sending email:', error);
    }
    this.resetForm();
  }

  private handleSuccessfulSubmission(): void {
    this.emailPopUpParagraph = 'Your message was successfully sent! ';
  }

  private handleFailedSubmission(responseCode: number): void {
    this.emailPopUpParagraph = `(${responseCode}) Our servers are full, please send an E-mail to crbrvsraps@gmail.com.`;
  }

  private resetForm(): void {
    this.submitted = false;
    this.contactMeForm.reset();
    Object.keys(this.contactMeForm.controls).forEach((key) => {
      const control = this.contactMeForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
      control?.updateValueAndValidity();
    });
  }

  closeEmailModal() {
    this.isEmailModalOpen = false;
  }
}
