import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { ContactMeForm } from '../interfaces/contact-me-form';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  constructor() {}

  sendEmailJS(contactMeForm: ContactMeForm): Promise<number> {
    let responseCode: number = 500;
    var params = {
      name: contactMeForm.name,
      email: contactMeForm.email,
      from_message: contactMeForm.from_message,
    };

    return emailjs
      .send(
        environment.emailJSConfig.serviceID,
        environment.emailJSConfig.templateID,
        params,
        environment.emailJSConfig.publicKey,
      )
      .then(
        (success: EmailJSResponseStatus): number => {
          responseCode = success.status;
          return responseCode;
        },
        (error): number => {
          responseCode = error.status;
          return responseCode;
        },
      );
  }
}
