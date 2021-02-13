const fields = document.querySelectorAll("[required]");

function validateField(field) {

  //check errors
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {

      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  //custom messages
  function customMessage(typeError) {
    const messages = {
      name: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido",
      },
      telefone: {
        valueMissing: "Telefone é obrigatório",
      }
    }

    return messages[field.name][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {

    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "#DD902F";
      setCustomMessage();
    }
  }
}

function customValidation(e) {

  const field = e.target;
  const validation = validateField(field);

  validation();

}

for (field of fields) {
  field.addEventListener("invalid", e => {
    e.preventDefault();

    customValidation(e);
  })
  field.addEventListener("blur", customValidation);
}


document.querySelector("form").addEventListener("submit", e => {
  console.log(e);

  //Form will not be send
  e.preventDefault();
});
