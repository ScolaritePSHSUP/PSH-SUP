// js/actualites.js

async function loadActualites() {
  const { data, error } = await supabaseClient
    .from("actualites")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur actualités :", error);
    return;
  }

  const container = document.getElementById("actualites");
  container.innerHTML = "";

  data.forEach(actu => {
    container.innerHTML += `
      <div class="card">
        <h3>${actu.titre}</h3>
        <p>${actu.resume}</p>
      </div>
    `;
  });
}

loadActualites();
