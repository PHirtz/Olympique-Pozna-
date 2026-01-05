import { r as registerLocaleLoader, i as init, g as getLocaleFromNavigator } from "./runtime.js";
registerLocaleLoader("fr", () => import("./fr.js"));
registerLocaleLoader("pl", () => import("./pl.js"));
registerLocaleLoader("en", () => import("./en.js"));
init({
  fallbackLocale: "pl",
  // Si la langue détectée n'existe pas, utilise le polonais
  initialLocale: getLocaleFromNavigator() || "pl"
  // Détecte le navigateur, sinon polonais par défaut
});
