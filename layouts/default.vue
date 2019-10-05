<template>
  <div>
    <div class="container">
      <b-navbar class="main-navbar" toggleable="lg" type="light">
        <b-navbar-brand href="#">
          <img height="140" src="img/PHE-logo.svg" alt="" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class=" ml-auto">
            <NLink class="nav-item nav-link" to="/">Főoldal</NLink>
            <NLink class="nav-item nav-link" to="/rolunk">Rólunk</NLink>
            <NLink class="nav-item nav-link" to="/referenciak"
              >Referenciáink</NLink
            >
            <NLink class="nav-item nav-link" to="/szolgaltatasok"
              >Szolgáltatások</NLink
            >
            <NLink class="nav-item nav-link" to="/blog">Híreink</NLink>
            <NLink class="nav-item nav-link" to="/kapcsolat"
              >Elérhetőségek</NLink
            >
          </b-navbar-nav>
          <!-- <b-navbar-nav class="">
            HU | EN
          </b-navbar-nav> -->
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss">
@import '~/assets/scss/app';
.main-navbar {
  padding: 0;
  .navbar-brand {
    padding-bottom: 0;
    padding-top: 0;
    margin-bottom: -78px;
    border-right: 5px solid $body-bg;
    border-bottom: 5px solid $body-bg;
  }
  .nav-link {
    text-transform: uppercase;
    text-decoration: none;

    &.active {
      font-weight: bold;
    }
  }
}
</style>
