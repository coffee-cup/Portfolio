<template>

  <div class="page-top vh">
    <m-nav></m-nav>

    <header class="c80r">

      <h1 id='hi-im' class='s80 mb0'>
        Hi I'm Jake
      </h1>
      <p class='s100'>
        Software Engineering student <br>
        studying at the <br>
        University of Victoria
      </p>

    </header>

    <div id="tagline" class="c80r">
      <h2 class='s100 tcenter'>
        My Passion is <span id="designing" class="serif">Designing</span> and <span id="developing" class='mono'>Developing</span> for the Internet
      </h2>
    </div>

    <div id='arrow' class="s100 calign">
      <img src="/down_arrow.svg" class='center-img'>
    </div>

  </div>

</template>

<script>

  import World from '../js/world.js';

  export default {
    name: 'Home',
    data() {
      return {
        msg: World.msg
      }
    }
  }
</script>
