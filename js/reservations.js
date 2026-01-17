async function reserver() {
  const { data: user } = await supabase.auth.getUser();

  const salle = document.getElementById("salle").value;

  const { error } = await supabase.from("reservations").insert({
    demandeur_id: user.user.id,
    salle_id: salle,
    date_debut: document.getElementById("debut").value,
    date_fin: document.getElementById("fin").value,
    motif: document.getElementById("motif").value
  });

  if (error) {
    alert("Salle indisponible ou erreur");
  } else {
    alert("Demande envoyée");
  }
}
