<template>

  <div class="project-section c100">
    <div class="s100">
      <div id='project-{{index}}' class="project c80r">

        <div class="s60m100 project-info">

          <div class="s70 project-header">
            <h2 class='mb0 mt0'>{{project.title}}</h2>
            <p class='mt-05'>{{project.short}}</p>
            <p class='mb0 project-links'>
              <a v-if='project.website' :href="project.website">
                website <span class="icomoon-link"></span>
              </a>
              <a v-if='project.download' :href="project.download">
                download <span class="icomoon-download"></span>
              </a>
              <a v-if='project.slack' :href="project.slack">
                add to Slack <span class="icomoon-slack"></span>
              </a>
              <span v-if='project.website'> | </span>
              <span v-if='project.download'> | </span>
              <span v-if='project.slack'> | </span>
              <a :href="project.github">github <span class="icomoon-github"></span></a>
            </p>
          </div>

          <div class="s30 project-logo">
            <img class='mw100' :src="project.logo">
          </div>
          <div class="s80m100">
            <p class='project-description'>
              {{project.long}}
            </p>
            <p class="project-made gray">
              {{project.made}}
            </p>
          </div>

        </div>

        <div class="s40m100 project-screenshots">

          <div class="s100 screenshot">
            <img class='center-img' :src="project.screenshot1">
          </div>

          <div v-if='project.screenshot2' class="s100 screenshot">
            <img class='center-img' :src="project.screenshot2">
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'Project',
    props: ['index', 'project'],
    ready: function() {
      var _this = this;
      var adjustScreenshot = function() {
        var mobile = 600;
        var project_id = '#project-' + _this.index;
        var fullHeight = $(project_id + ' .project-info').height();
        var imgs = $(project_id + ' .project-screenshots .screenshot img');
        if ($(window).width() > mobile) {
          imgs.css('max-height', ((fullHeight / 2) - 10) + 'px');
        } else {
          imgs.css('max-height', 'none');
        }
      }
      $(window).resize(adjustScreenshot);
      adjustScreenshot();
    }
  }
</script>
