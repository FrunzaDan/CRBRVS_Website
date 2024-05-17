import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { ContactMeForm } from '../interfaces/contact-me-form';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {
  constructor() {}

  sendEmailJS(contactMeForm: ContactMeForm): Promise<number> {
    let responseCode = 500;
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
        environment.emailJSConfig.publicKey
      )
      .then(
        (success) => {
          responseCode = success.status;
          return responseCode;
        },
        (error) => {
          responseCode = error.status;
          return responseCode;
        }
      );
  }
}
