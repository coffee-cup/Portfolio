<template>

  <div id='{{hash}}' class="header row-section dark-colour c100">
    <div class="s100">
      <div class="c80r">
        <div class="s100 tcenter">
          <h2 class='mt0 mb0'>{{title}}</h2>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Header',
    props: ['title', 'hash']
  }
</script>
