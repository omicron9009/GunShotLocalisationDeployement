window.location.href = "/home.html";

document.querySelector('#app').innerHTML = `
  <div style="text-align: center; margin-top: 20%;">
    <h2>Redirecting...</h2>
    <p>If you are not redirected, <a href="./public/home.html">click here</a>.</p>
  </div>
`;