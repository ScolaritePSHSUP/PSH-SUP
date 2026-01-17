document.addEventListener("DOMContentLoaded", async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    // Pas connecté → retour login
    window.location.href = "login.html";
  }
});
