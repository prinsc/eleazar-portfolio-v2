![Eléazar Klyuvitkin's Portfolio screenshot](https://kltk.be/assets/img/banner.png)

# Eléazar Klyuvitkin's Portfolio

This project is a personal portfolio that I make available to inspire and help other developers. You are free to duplicate this portfolio for your own projects, but I kindly ask you to include the mention **"Inspired by Eléazar"**. This helps respect the ethics of sharing and mutual inspiration.

## Customization

You can easily modify the content of this portfolio by adjusting the following files:

- **General Content**:  
  Edit the files `src/lib/content/settings.json` and `src/lib/content/data.json` to change the information, projects, and sections of your portfolio.

- **Colors & Style**:  
  You can customize the appearance by modifying the files:
  - `lib/styles/themes/_colors.scss` for colors.
  - `lib/styles/base/_base.scss` for general styles.
  - `lib/styles/base/_typographie.scss` for typography.

This will allow you to easily adjust the appearance and content of your portfolio according to your needs.

## Email (devis) via Resend

Le formulaire de devis (`/api/estimate`) peut envoyer un email via Resend.

Variables d'environnement à définir :

- `RESEND_API_KEY` : clé API Resend
- `RESEND_FROM` : expéditeur autorisé (ex: `KLTK <no-reply@votre-domaine.tld>`)
- `RESEND_TO` : (optionnel) destinataire(s) séparés par des virgules (ex: `contact@domaine.tld,hello@domaine.tld`).
  - Par défaut, l'email est envoyé à `kltk.eleazar@gmail.com`.

Si une de ces variables manque, l'endpoint renvoie une erreur (pour éviter de croire que l'envoi a marché).