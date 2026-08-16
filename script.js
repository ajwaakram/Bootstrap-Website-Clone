/* =========================================================
   Startup — site interactions
   ========================================================= */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar shadow on scroll
  var navbar = document.querySelector(".navbar-startup");
  function onScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
    if (scrollTopBtn) scrollTopBtn.classList.toggle("show", window.scrollY > 400);
  }

  // Scroll-to-top button
  var scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Close mobile navbar after clicking a link
  var navLinks = document.querySelectorAll("#mainNav .nav-link:not(.dropdown-toggle), #mainNav .dropdown-item");
  var collapseEl = document.getElementById("mainNav");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (collapseEl && collapseEl.classList.contains("show") && window.bootstrap) {
        var instance = window.bootstrap.Collapse.getInstance(collapseEl);
        if (instance) instance.hide();
      }
    });
  });

  // Simple client-side form feedback
  document.querySelectorAll("form[data-feedback]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      form.reset();
      form.classList.remove("was-validated");
      var msg = form.getAttribute("data-feedback") || "Thanks! We will be in touch soon.";
      var alertBox = document.createElement("div");
      alertBox.className = "alert alert-success mt-3 rounded-3";
      alertBox.setAttribute("role", "alert");
      alertBox.textContent = msg;
      form.appendChild(alertBox);
      setTimeout(function () {
        alertBox.remove();
      }, 4000);
    });
  });
})();
