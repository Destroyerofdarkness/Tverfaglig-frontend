document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  const form = document.querySelector("form");
  const errorDiv = document.querySelector(".error");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const passwd = form.passwd.value;
    const conPass = form.conPass.value;
    errorDiv.textContent = "";
    try {
      const res = await fetch("http://backend.megatron.ikt-fag.no:6001/sign-up", {
        method: "POST",
        body: JSON.stringify({ username, passwd, conPass }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.userId) {
        window.location.href = `/cookie/${data.userId}`;
      }
      if (data.errors) {
        console.log(data.errors);
        errorDiv.innerHTML += `<p>${data.errors.username}</p>
        <p>${data.errors.passwd}</p>
        `;
      }
    } catch (err) {
      console.log(err);
    }
  });
});
