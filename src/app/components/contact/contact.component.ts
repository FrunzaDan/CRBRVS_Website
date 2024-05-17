import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { transformIn, transformOut } from '../../animations';
import { ContactMeForm } from '../../interfaces/contact-me-form';
import { SendEmailService } from '../../services/send-email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  animations: [transformIn, transformOut],
})
export class ContactComponent implements OnInit {
  isEmailModalOpen: boolean = false;
  emailPopUpHeader!: string;
  emailPopUpParagraph!: string;
  submitted: boolean = false;

  constructor(private sendEmailService: SendEmailService) {}

  contactMeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    from_message: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.contactMeForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.contactMeForm.invalid) {
      return;
    }

    this.isEmailModalOpen = true;

    this.emailPopUpHeader = 'Hi, ' + this.contactMeForm.value.name;
    this.emailPopUpParagraph = 'Sending...';

    let responseCodePromise: Promise<number> =
      this.sendEmailService.sendEmailJS(
        this.contactMeForm.value as ContactMeForm
      );
    responseCodePromise.then((responseCode) => {
      if (responseCode === 200) {
        this.contactMeForm.reset();
        this.contactMeForm.controls.name.setErrors(null);
        this.contactMeForm.controls.email.setErrors(null);
        this.contactMeForm.controls.from_message.setErrors(null);
        this.emailPopUpParagraph = 'Your message was successfully sent! ';
      } else {
        this.emailPopUpParagraph =
          '(' +
          responseCode +
          ') ' +
          'Our servers are full, please send an E-mail to crbrvsraps@gmail.com. ';
      }
    });
  }

  closeEmailModal() {
    this.isEmailModalOpen = false;
  }
}
