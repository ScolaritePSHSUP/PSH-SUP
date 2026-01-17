async function loadSalles() {
  const { data } = await supabase
    .from("salles")
    .select("*")
    .eq("actif", true)
    .order("campus");

  const div = document.getElementById("salles");
  div.innerHTML = "";

  data.forEach(s => {
    div.innerHTML += `
      <div class="card">
        <h3>Salle ${s.numero}</h3>
        <p>Campus : ${s.campus}</p>
        <p>Capacité : ${s.capacite}</p>
      </div>
    `;
  });
}

loadSalles();
