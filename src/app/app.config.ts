import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "peytor-4dedd", appId: "1:970206228738:web:c7291945d01faea65cd21b", storageBucket: "peytor-4dedd.firebasestorage.app", apiKey: "AIzaSyC8nqvDUKjHJpobkxmc007Lyl8eKjObj88", authDomain: "peytor-4dedd.firebaseapp.com", messagingSenderId: "970206228738", measurementId: "G-SMDLK1BHNY" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
