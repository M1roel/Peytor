import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {
  getAuthErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Diese E-Mail-Adresse ist leider ungültig.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
        return 'Falsches Passwort oder E-Mail. Bitte noch einmal versuchen.';
      case 'auth/user-not-found':
        return 'Kein Benutzer mit dieser E-Mail gefunden.';
      case 'auth/email-already-in-use':
        return 'Diese E-Mail-Adresse ist bereits registriert.';
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
}
