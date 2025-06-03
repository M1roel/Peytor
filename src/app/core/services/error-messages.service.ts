import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {
  getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'invalid-email':
        return 'Diese E-Mail-Adresse ist leider ungültig.';
      case 'invalid_credentials':
        return 'Falsches Passwort oder E-Mail. Bitte noch einmal versuchen.';
      case 'user-not-found':
        return 'Kein Benutzer mit dieser E-Mail gefunden.';
      case 'email-already-in-use':
        return 'Diese E-Mail-Adresse ist bereits registriert.';
      case 'weak_password':
        return 'Das Passwort muss mindestens 6 Zeichen lang sein.';
      case 'email_not_confirmed':
        return 'Bitte bestätige deine E-Mail-Adresse, um fortzufahren.';
      default:
        return 'Unbekannter Fehler: ' + errorCode;
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
