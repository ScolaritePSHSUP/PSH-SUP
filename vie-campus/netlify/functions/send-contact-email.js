import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const {
      nom,
      prenom,
      classe,
      email,
      campus,
      objet,
      message,
      justificatif_url,
      justificatif_name
    } = JSON.parse(event.body);

    const html = `
      <h2>Nouveau message – PSH SUP</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Prénom :</strong> ${prenom}</p>
      <p><strong>Classe :</strong> ${classe}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Campus :</strong> ${campus}</p>
      <p><strong>Objet :</strong> ${objet}</p>

      <hr>

      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>

      ${
        justificatif_url
          ? `<hr>
             <p><strong>Justificatif :</strong></p>
             <p>
               <a href="${justificatif_url}" target="_blank">
                 📎 ${justificatif_name || "Télécharger le justificatif"}
               </a>
             </p>`
          : ""
      }
    `;

    await resend.emails.send({
      from: "PSH SUP <no-reply@passy-st-honore.com>",
      to: ["scolaritepshsup@passy-st-honore.com"],
      reply_to: email,
      subject: `📩 Nouveau message – ${objet}`,
      html
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur envoi email" })
    };
  }
}
