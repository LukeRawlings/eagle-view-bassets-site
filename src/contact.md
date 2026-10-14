---
title: "Contact"
description: "Contact Eagle View Bassets in Columbia, Missouri about basset hound puppies, our dogs, or an upcoming litter."
---

<section class="page-hero">
  <div class="container">
    <h1>Contact us</h1>
    <p class="lede">Are you looking for a puppy to join your family? Do you have questions about our dogs or how we raise pups? Send us a message and we'll be in touch soon.</p>
  </div>
</section>

<section class="container section">
  <div class="contact-layout">
    <div class="contact-form-wrap">
      <h2>Send a message</h2>
      {% include "contact-form.njk" %}
    </div>
    <aside class="contact-aside">
      <div class="contact-aside-inner">
      <ul class="contact-list">
        <li class="contact-item">
          <span class="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M12 21.5s7-6.6 7-11.4a7 7 0 1 0-14 0c0 4.8 7 11.4 7 11.4z"/><circle cx="12" cy="10.1" r="2.6"/></svg></span>
          <div class="contact-body">
            <h2>Visit</h2>
            <address>{{ site.address.street }}<br>{{ site.address.city }}, {{ site.address.state }} {{ site.address.zip }}</address>
          </div>
        </li>
        <li class="contact-item">
          <span class="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="M6.4 3.5h3.1l1.5 3.9-2 1.4a12.6 12.6 0 0 0 6.2 6.2l1.4-2 3.9 1.5v3.1a2 2 0 0 1-2.2 2A17 17 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2z"/></svg></span>
          <div class="contact-body">
            <h2>Phone</h2>
            <p><a href="tel:{{ site.phoneHref }}">{{ site.phone }}</a></p>
          </div>
        </li>
        <li class="contact-item">
          <span class="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.6 7.6 8.4 5.9 8.4-5.9"/></svg></span>
          <div class="contact-body">
            <h2>Email</h2>
            <p><a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
          </div>
        </li>
      </ul>
      </div>
    </aside>
  </div>
</section>
