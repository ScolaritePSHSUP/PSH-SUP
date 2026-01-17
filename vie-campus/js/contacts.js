async function loadContacts() {
  const { data } = await supabase
    .from("contacts_administration")
    .select("*")
    .eq("actif", true)
    .order("ordre");

  const div = document.getElementById("contacts");
  div.innerHTML = "";

  data.forEach(c => {
    div.innerHTML += `
      <div class="contact">
        <img src="${c.photo_url || 'assets/images/user.png'}">
        <h3>${c.prenom || ""} ${c.nom}</h3>
        <p>${c.poste}</p>
        <p>${c.email || ""}</p>
      </div>
    `;
  });
}

loadContacts();
