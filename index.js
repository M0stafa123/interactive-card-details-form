let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let date = document.querySelectorAll("fieldset input");
let cvc = document.querySelector(".cvc");
let cvcValue = document.querySelector(".cvc-value");
let dateValue = document.querySelector(".date-value");
let namevalue = document.querySelector(".name-value");
let numbervalue = document.querySelector(".number-value");
let cardNumber = document.querySelector("#Number");
let name = document.querySelector("#name");
let card = document.querySelector(".card");
let thanks = document.querySelector(".thank-you");
cardNumber.oninput = function () {
  let format = cardNumber.value.match(/\d{4}/g).join(" ");
  numbervalue.innerHTML = format;
};
name.oninput = function () {
  namevalue.innerHTML = name.value;
};
date[0].oninput = function () {
  if (date[0].value != " ") {
    dateValue.dataset.month = date[0].value.match(/\d+/);
    dateValue.innerHTML = `${dateValue.dataset.month}/${dateValue.dataset.year}`;
  }
};
date[1].oninput = function () {
  if (date[1].value != " ") {
    dateValue.dataset.year = date[1].value.match(/\d+/);
    dateValue.innerHTML = `${dateValue.dataset.month}/${dateValue.dataset.year}`;
  }
};
cvc.addEventListener("input", function () {
  cvcValue.innerHTML = cvc.value.match(/\d+/);
});
cvc.addEventListener("focus", () => {
  card.classList.add("flip");
});
cvc.addEventListener("blur", () => {
  card.classList.remove("flip");
});
form.onsubmit = function (e) {
  e.preventDefault();
  inputs.forEach((e) => {
    if (e.value === "") {
      e.parentElement.classList.add("err-empty");
    } else if (e.parentElement.classList.contains("err-empty")) {
      e.parentElement.classList.remove("err-empty");
    }
  });

  if (!/^[0-9]+$/.test(cardNumber.value)) {
    cardNumber.parentElement.classList.add("err-letter");
  } else if (cardNumber.parentElement.classList.contains("err-letter")) {
    cardNumber.parentElement.classList.remove("err-letter");
  }
  if (cardNumber.value.length < 16) {
    cardNumber.parentElement.classList.add("err-card-format");
  } else if (cardNumber.parentElement.classList.contains("err-card-format")) {
    cardNumber.parentElement.classList.remove("err-card-format");
  }
  document.querySelectorAll("form > div input").forEach((e) => {
    if (!/^[0-9]+$/.test(e.value)) {
      e.parentElement.classList.add("err-letter");
    } else if (e.parentElement.classList.contains("err-letter")) {
      e.parentElement.classList.remove("err-letter");
    }
  });
  let arr = Array.from(inputs);
  if (
    arr.every((e) => !e.parentElement.classList.contains("err-empty")) &&
    arr.every((e) => !e.parentElement.classList.contains("err-letter")) &&
    arr.every((e) => !e.parentElement.classList.contains("err-card-format"))
  ) {
    form.style.display = "none";
    thanks.style.display = "block";
  }
};
