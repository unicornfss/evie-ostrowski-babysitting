const revealItems = document.querySelectorAll(".about-media, .creds li, .offer li");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  observer.observe(item);
});

// FormSubmit destination — edit here only
const CONTACT_EMAIL = "jonski1382@gmail.com";

// FormSubmit needs a real http(s) page URL — not file://
const formUrl = document.getElementById("form-url");
const formNext = document.getElementById("form-next");
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.action = `https://formsubmit.co/${CONTACT_EMAIL}`;
}

if (formUrl && formNext) {
  const here = window.location.href.split("#")[0];
  formUrl.value = here;
  formNext.value = here.replace(/index\.html?$/i, "") + "thanks.html";
}

form?.addEventListener("submit", () => {
  if (window.location.protocol === "file:") {
    statusEl.hidden = false;
    statusEl.className = "form-status error";
    statusEl.textContent =
      "Open the site via the local web link (http://localhost…), not as a saved file, or FormSubmit may block it.";
  } else {
    statusEl.hidden = false;
    statusEl.className = "form-status pending";
    statusEl.textContent = "Sending…";
  }
});

const lastUpdated = document.getElementById("last-updated");
if (lastUpdated) {
  const d = new Date(document.lastModified);
  lastUpdated.textContent = `Last updated ${d.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
