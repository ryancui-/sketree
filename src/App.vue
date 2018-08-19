<template>
  <div id="app">
    <div class="tree-pad">
      <tree-pad></tree-pad>
    </div>
    <div class="tree-json">
      <tree-display></tree-display>
    </div>
  </div>
</template>

<script>
  import TreePad from './components/TreePad';
  import TreeDisplay from './components/TreeDisplay';

  export default {
    name: 'App',
    components: {
      TreePad, TreeDisplay
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
  }

  #app {
    display: flex;
    height: 100%;
  }

  .tree-pad, .tree-json {
    margin: 10px;
  }

  .tree-pad {
    flex-basis: 700px;
  }

  .tree-json {
    flex-grow: 1;
  }

</style>
