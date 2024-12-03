export class User {
    prenom!: string;            // Prénom de l'utilisateur
    adress!: string;            // Adresse de l'utilisateur
    tel!: string;               // Numéro de téléphone
    siret!: string;             // Numéro SIRET
    username!: string;          // Nom d'utilisateur
    password!: string;          // Mot de passe
    email!: string;             // Adresse email
    enabled!: boolean;          // Statut du compte (activé/désactivé)
    roles!: string[];           // Rôles associés à l'utilisateur
  }
  