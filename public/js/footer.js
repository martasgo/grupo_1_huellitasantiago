window.addEventListener('load', () => {
    let form = document.querySelector("#formSendMail");

    // Función para validar formato email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

      document.querySelector("#send").addEventListener("click", (e) => {
        e.preventDefault();
        if (document.querySelector("#email").value == "") {
            document.querySelector("#msjErrorEmail").innerText = "Debe ingresar un email";
        } else if (!isValidEmail(email.value.trim())) {
            document.querySelector("#msjErrorEmail").innerText = "Debe ingresar un email válido";
        } else {
            alert ('Email enviado')
        }
    })

})