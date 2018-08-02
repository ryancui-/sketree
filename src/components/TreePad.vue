<template>
  <canvas id="pad" class="pad"></canvas>
</template>

<script>
  export default {
    name: 'TreePad',
    mounted() {
      const canvas = new fabric.Canvas('pad');
      canvas.setDimensions({ width: '700', height: '700' });

      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      });

      canvas.add(rect);
    }
  };
</script>

<style scoped>
  .pad {
    display: block;
    background-color: rgba(0, 0, 0, 0.08);
  }
</style>
