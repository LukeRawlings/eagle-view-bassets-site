---
title: "Our Dogs"
description: "Meet Dottie, Bonnie, Betsie, and Tucker, the Eagle View Bassets family in Columbia, Missouri."
---

<section class="page-hero">
  <div class="container">
    <h1>Our dogs</h1>
    <p class="lede">Here are the amazing dogs that make it all possible. All are socialized to love people and are handled daily because we care about their wellbeing.</p>
  </div>
</section>

<section class="container section">
  <h2 class="group-heading">Our girls</h2>
  <div class="dog-grid">
    {% for dog in dogs %}{% if dog.sex == "female" %}{% include "dog-card.njk" %}{% endif %}{% endfor %}
  </div>
</section>

<section class="container section">
  <h2 class="group-heading">Our boy</h2>
  <div class="dog-grid dog-grid--single">
    {% for dog in dogs %}{% if dog.sex == "male" %}{% include "dog-card.njk" %}{% endif %}{% endfor %}
  </div>
</section>
