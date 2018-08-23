<template>
  <div id="app">
    <div class="tree-pad">
      <div>
        <h2>使用说明</h2>
        <p>1. 双击节点创建子节点</p>
        <p>2. 选择节点后，按 Backspace/Delete 键删除节点（及其所有子节点）</p>
      </div>
      <div class="btn-panel">
        <button @click="smoothTree">整理</button>
      </div>
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
    },
    methods: {
      smoothTree() {
        console.log(123);
      }
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
