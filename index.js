let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let date = document.querySelectorAll("fieldset input");
let cvc = document.querySelector(".cvc");
let cvcValue = document.querySelector(".cvc-value");
let dateValue = document.querySelector(".date-value");
let namevalue = document.querySelector(".name-value");
let numbervalue = document.querySelector(".number-value");
let cardNumber = document.querySelector("#Number");
let names = document.querySelector("#name");
let card = document.querySelector(".card");
let thanks = document.querySelector(".thank-you");
// real time display
cardNumber.addEventListener("input", function () {
  let format = cardNumber.value.match(/\d{4}/g).join(" ");
  numbervalue.innerHTML = format;
});
names.addEventListener("input", function () {
  namevalue.innerHTML = names.value;
});
date[0].addEventListener("input", function (e) {
  if (date[0].value != "") {
    dateValue.dataset.month = date[0].value.match(/\d+/);
    dateValue.innerHTML = `${dateValue.dataset.month}/${dateValue.dataset.year}`;
  }
});
date[1].oninput = function () {
  if (date[1].value != " ") {
    dateValue.dataset.year = date[1].value.match(/\d+/);
    dateValue.innerHTML = `${dateValue.dataset.month}/${dateValue.dataset.year}`;
  }
};
cvc.addEventListener("input", function () {
  cvcValue.innerHTML = cvc.value.match(/\d+/);
});
// ######
// reset values
cardNumber.addEventListener("blur", () => {
  if (cardNumber.value === "") {
    numbervalue.innerHTML = "0000 0000 0000 0000";
  }
});

names.addEventListener("blur", () => {
  if (names.value === "") {
    namevalue.innerHTML = "Jane Appleseed";
  }
});

date[0].addEventListener("blur", () => {
  if (date[0].value === "") {
    dateValue.dataset.month = "00";
    dateValue.innerHTML = `${dateValue.dataset.month}/${dateValue.dataset.year}`;
  }
});

date[1].addEventListener("blur", () => {
  if (date[1].value === "") {
    dateValue.dataset.year = "00";
    dateValue.innerHTML = `${dateValue.dataset.month}/${dateValue.dataset.year}`;
  }
});
cvc.addEventListener("blur", () => {
  if (cvc.value === "") {
    cvcValue.innerHTML = "000";
  }
});
// ######
// flip card
cvc.addEventListener("focus", () => {
  card.classList.add("flip");
});
cvc.addEventListener("blur", () => {
  card.classList.remove("flip");
});
// ####
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
    removeClass(cardNumber.parentElement, "err-letter");
  }
  if (cardNumber.value.length < 16) {
    addClass(cardNumber.parentElement, "err-format");
  } else if (isClass(cardNumber.parentElement, "err-format")) {
    removeClass(cardNumber.parentElement, "err-format");
  }
  document.querySelectorAll("form > div input").forEach((e) => {
    if (!/^[0-9]+$/.test(e.value)) {
      addClass(e.parentElement, "err-letter");
    } else if (isClass(e.parentElement, "err-letter")) {
      e.parentElement.classList.remove("err-letter");
    }
  });
  let arr = Array.from(inputs);
  if (date[0].value > 12) {
    addClass(date[0].parentElement, "err-format");
  } else if (
    date[0].value > 12 ||
    isClass(date[0].parentElement, "err-format")
  ) {
    removeClass(date[0].parentElement, "err-format");
  }
  if (
    arr.every((e) => !isClass(e.parentElement, "err-empty")) &&
    arr.every((e) => !isClass(e.parentElement, "err-letter")) &&
    arr.every((e) => !isClass(e.parentElement, "err-format"))
  ) {
    form.style.display = "none";
    thanks.style.display = "block";
  }
};

let end = document.querySelector(".end");
let display = document.querySelector(".display");
end.addEventListener("click", function () {
  thanks.style.transition = "0.5s";
  thanks.style.opacity = "0";
  setTimeout(() => {
    thanks.style.display = "none";
    display.style.display = "block";
  }, 500);
  setTimeout(() => {
    display.style.opacity = "1";
  }, 600);
  card.style.cssText = "transform:scale(0.6) translate(-82%,61%) ";
  document.querySelector(".show-name").innerHTML = namevalue.innerHTML;
  document.querySelector(".show-number").innerHTML =
    numbervalue.innerHTML.replaceAll(" ", "-");
  document.querySelector(".show-date").innerHTML = dateValue.innerHTML;
  document.querySelector(".show-cvc").innerHTML = cvcValue.innerHTML;
});
function addClass(e, cls) {
  e.classList.add(cls);
}
function removeClass(e, cls) {
  e.classList.remove(cls);
}
function isClass(e, cls) {
  return e.classList.contains(cls);
}
