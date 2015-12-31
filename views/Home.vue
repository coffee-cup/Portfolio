<template>

  <div class="page-top vh">
    <m-nav></m-nav>

    <header class="c80r">

      <h1 id='hi-im' class='s80 mb0'>
        <a class='no-link' href="/">Hi I'm Jake</a>
      </h1>
      <p class='s100'>
        Software Engineering student <br>
        studying at the <br>
        <a href="https://www.google.ca/maps/place/University+of+Victoria/@49.0284597,-114.7863023,5z/data=!4m2!3m1!1s0x548f71575d850fbd:0xc039d0b85e1ede74">University of Victoria <span class="icomoon-map-marker"></span></a>
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

  <div class="c100 main-colour row-section">
    <div class="s100">

      <div class="c80r">
        <div id='welcome' class="s70">
          <h2 class='mt0 mb0'>Welcome,</h2>
          <p id='space' class='mt-05'>to my space on the web</p>
        </div>
        <div id='resume' class="s30 tright">
          <a href="http://resume.jakerunzer.xyz">
            <span class="icomoon-resume"></span>
            <p class='inline'> resume</p>
          </a>
        </div>
      </div>

      <div class="c80r">
        <div class="copy-info s50m100">
          <p>
            If you’re wondering, <br>
            I am a developer who likes to work with the full stack. From designing user interfaces to coding algorithms on the server. I am constantly learning, improving my skills, and building things for the web and IOS.
          </p>
        </div>
        <div class="copy-info s50m100">
          <p>
            I believe in simple, functional, and elegant design, and strive for that in my work. I am either in school or on a co-op but am always interested in internships or job opportunities. Please feel free to contact me below.
          </p>
        </div>
      </div>

    </div>
  </div>

  <s-header title="Things I've Done" hash="projects"></s-header>

  <s-project
    v-for="project in projects"
    :project="project"
    :index="$index"
  >
  </s-project>

  <s-header title="Contact Me" hash="contact"></s-header>

  <m-contact></m-contact>

  <m-footer></m-footer>

</template>

<script>

  import World from '../js/world.js';
  import projects from '../js/projects.js';

  export default {
    name: 'Home',
    data() {
      return {
        projects
      }
    },

    ready: function() {
      var projects = $('.project');
      projects.last().css('border-bottom', 'none');
    }
  }
</script>
