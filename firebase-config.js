// ==========================================================================
// FrutiControl VE - Configuración Real de Firebase Auth
// ==========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyAxzWTFl1erenoy_cdc-9c-pATfPbsnIcc",
  authDomain: "fruticontrol-ff453.firebaseapp.com",
  projectId: "fruticontrol-ff453",
  storageBucket: "fruticontrol-ff453.firebasestorage.app",
  messagingSenderId: "704527896029",
  appId: "1:704527896029:web:c1b3f551f02d34e23f7a34"
};

// Inicialización de Firebase Compat SDK
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}
