import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {

  getAuthErrorMessage(errorCodeOrMessage: string): string {
  switch (errorCodeOrMessage) {
    case 'invalid-email':
    case 'invalid_credentials':
      return 'Diese E-Mail-Adresse ist leider ungültig oder das Passwort ist falsch.';
    case 'user_already_exists':
    case 'email-already-in-use':
      return 'Diese E-Mail-Adresse ist bereits registriert.';
    case 'user-not-found':
      return 'Kein Benutzer mit dieser E-Mail gefunden.';
    case 'weak_password':
      return 'Das Passwort muss mindestens 6 Zeichen lang sein.';
    case 'email_not_confirmed':
      return 'Bitte bestätige deine E-Mail-Adresse, um fortzufahren.';
    default:
      return 'Unbekannter Fehler: ' + errorCodeOrMessage;
  }
}

  getFieldRequiredMessage(field: string): string {
    return `Bitte ${field} eingeben.`;
  }

  getInvalidEmailFormatMessage(): string {
    return 'Bitte eine gültige E-Mail-Adresse eingeben.';
  }

  getPasswordMismatchMessage(): string {
    return 'Die Passwörter stimmen nicht überein. Bitte erneut eingeben.';
  }
}
