import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (input: string) =>
    String(input).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const normalizeValue = (value: unknown) => {
    const v = String(value ?? '').trim();
    return v.length ? v : '-';
};

type Answers = Record<string, unknown>;

type Field = {
    key: string;
    label: string;
};

type Section = {
    title: string;
    fields: Field[];
};

const SECTIONS: Section[] = [
    {
        title: '1) Identité & Objectifs',
        fields: [
            { key: 'objectif', label: 'But principal du site' },
            { key: 'cible', label: 'Cible prioritaire' },
            { key: 'exemples', label: 'Sites exemples / concurrents' }
        ]
    },
    {
        title: '2) Budget & Planning',
        fields: [
            { key: 'launch_date', label: 'Date de lancement impérative' },
            { key: 'budget', label: 'Budget alloué' },
            { key: 'final_decider', label: 'Décideur final' }
        ]
    },
    {
        title: '3) Identité Visuelle & Assets',
        fields: [
            { key: 'logo', label: 'Logo' },
            { key: 'charte', label: 'Charte graphique' },
            { key: 'photos', label: 'Photos & vidéos' }
        ]
    },
    {
        title: '4) Aspect Technique',
        fields: [
            { key: 'domaine', label: 'Nom de domaine' },
            { key: 'hebergement', label: 'Hébergement' },
            { key: 'acces', label: 'Accès (Registrar / DNS)' }
        ]
    },
    {
        title: '5) Contenu & Rédaction',
        fields: [
            { key: 'textes', label: 'Qui fournit les textes' },
            { key: 'langues', label: 'Langues' },
            { key: 'pages', label: 'Pages spécifiques' }
        ]
    },
    {
        title: '6) Preuves Sociales & Chiffres',
        fields: [
            { key: 'avis', label: 'Avis clients' },
            { key: 'chiffres', label: 'Chiffres clés' },
            { key: 'partenaires', label: 'Partenaires' }
        ]
    },
    {
        title: '7) Fonctionnalités & Business',
        fields: [
            { key: 'conversion', label: 'Conversion (action souhaitée)' },
            { key: 'contact_form', label: 'Formulaire de contact spécifique' },
            { key: 'rendezvous', label: 'Prise de rendez-vous en ligne' },
            { key: 'integrations', label: 'Intégrations (CRM, WhatsApp, etc.)' },
            { key: 'interactive_map', label: 'Carte interactive' },
            { key: 'user_accounts', label: 'Comptes utilisateurs / espace client' },
            { key: 'ecommerce', label: 'E-commerce' },
            { key: 'newsletter', label: 'Newsletter' }
        ]
    },
    {
        title: '8) Marketing & SEO',
        fields: [
            { key: 'seo_keywords', label: '3 mots-clés (cibles Google)' },
            { key: 'primary_action', label: 'Action principale du visiteur' },
            { key: 'seo_target', label: 'Cible (locale / nationale)' }
        ]
    },
    {
        title: '9) Après-vente',
        fields: [
            { key: 'content_updates_owner', label: 'Qui met à jour le contenu' },
            { key: 'need_pro_email', label: 'Adresse email pro (contact@...)' }
        ]
    },
    {
        title: '10) Obligations légales',
        fields: [
            { key: 'mentions', label: 'Mentions légales (BCE + TVA)' },
            { key: 'rgpd', label: 'RGPD (politique / consentement cookies)' }
        ]
    }
];

const buildTextEmail = (contact: { name: string; email: string; phone: string; company: string }, answers: Answers) => {
    const lines: string[] = [];
    lines.push('Nouvelle demande de devis (site web)');
    lines.push('');
    lines.push('--- Contact ---');
    lines.push(`Nom: ${normalizeValue(contact.name)}`);
    lines.push(`Email: ${normalizeValue(contact.email)}`);
    lines.push(`Téléphone: ${normalizeValue(contact.phone)}`);
    lines.push(`Société: ${normalizeValue(contact.company)}`);
    lines.push('');

    for (const section of SECTIONS) {
        lines.push(`--- ${section.title} ---`);
        for (const field of section.fields) {
            const value = normalizeValue(answers[field.key]);
            // Indentation pour les réponses multi-lignes
            const formatted = value
                .split('\n')
                .map((l, i) => (i === 0 ? l : `    ${l}`))
                .join('\n');
            lines.push(`${field.label}: ${formatted}`);
        }
        lines.push('');
    }

    return lines.join('\n');
};

const buildHtmlEmail = (contact: { name: string; email: string; phone: string; company: string }, answers: Answers) => {
    const sectionHtml = SECTIONS.map((section) => {
        const rows = section.fields
            .map((field) => {
                const raw = normalizeValue(answers[field.key]);
                const value = escapeHtml(raw).replace(/\n/g, '<br />');
                return `
                    <tr>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;white-space:nowrap;"><strong>${escapeHtml(field.label)}</strong></td>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;">${value}</td>
                    </tr>`;
            })
            .join('');

        return `
            <h2 style="margin:24px 0 8px;font-size:16px;">${escapeHtml(section.title)}</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }).join('');

    return `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.4;color:#111;">
            <h1 style="font-size:18px;margin:0 0 12px;">Nouvelle demande de devis (site web)</h1>
            <p style="margin:0 0 16px;color:#444;">Reçu depuis le formulaire de devis.</p>
            <h2 style="margin:16px 0 8px;font-size:16px;">Contact</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
                <tbody>
                    <tr>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;white-space:nowrap;"><strong>Nom</strong></td>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;">${escapeHtml(normalizeValue(contact.name))}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;white-space:nowrap;"><strong>Email</strong></td>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;">${escapeHtml(normalizeValue(contact.email))}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;white-space:nowrap;"><strong>Téléphone</strong></td>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;">${escapeHtml(normalizeValue(contact.phone))}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;white-space:nowrap;"><strong>Société</strong></td>
                        <td style="padding:8px 10px;vertical-align:top;border-top:1px solid #eee;">${escapeHtml(normalizeValue(contact.company))}</td>
                    </tr>
                </tbody>
            </table>
            ${sectionHtml}
            <p style="margin:24px 0 0;color:#666;font-size:12px;">(Email généré automatiquement)</p>
        </div>`;
};

export const POST = async ({ request }) => {
    try {
        const body = await request.json();
        const answers = body?.answers || {};

        const contact = {
            name: String(answers?.contact_name || '').trim(),
            email: String(answers?.contact_email || '').trim(),
            phone: String(answers?.contact_phone || '').trim(),
            company: String(answers?.contact_company || '').trim()
        };

        if (!contact.name) {
            return new Response(JSON.stringify({ error: 'Nom requis' }), { status: 400 });
        }
        if (!contact.email || !isValidEmail(contact.email)) {
            return new Response(JSON.stringify({ error: 'Email invalide' }), { status: 400 });
        }

        const text = buildTextEmail(contact, answers);
        const html = buildHtmlEmail(contact, answers);

        const resendApiKey = env.RESEND_API_KEY;
        const resendFrom = env.RESEND_FROM;
        const resendTo = (env.RESEND_TO || 'kltk.eleazar@gmail.com').trim();

        if (!resendApiKey || !resendFrom || !resendTo) {
            // On ne "réussit" pas silencieusement: sinon tu crois que tout marche alors que rien ne part.
            console.warn('Resend not configured. Missing env vars.', {
                RESEND_API_KEY: Boolean(resendApiKey),
                RESEND_FROM: Boolean(resendFrom),
                RESEND_TO: Boolean(resendTo)
            });
            return new Response(
                JSON.stringify({
                    error:
                        "Resend n'est pas configuré. Définissez RESEND_API_KEY, RESEND_FROM, RESEND_TO dans vos variables d'environnement."
                }),
                { status: 500 }
            );
        }

        const resend = new Resend(resendApiKey);
        const to = resendTo.split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        const { data, error } = await resend.emails.send({
            from: resendFrom,
            to,
            subject: 'Nouvelle demande de devis — site web',
            replyTo: contact.email,
            text,
            html
        });

        if (error) {
            console.error('Resend error:', error);
            return new Response(JSON.stringify({ error: 'Échec envoi email (Resend)', details: error }), {
                status: 502
            });
        }

        return new Response(JSON.stringify({ ok: true, id: data?.id }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 500 });
    }
};
