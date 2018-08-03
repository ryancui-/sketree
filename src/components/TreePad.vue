<template>
  <canvas id="pad" class="pad"></canvas>
</template>

<script>
  import { mapState } from 'vuex';

  const RADIUS = 20;
  const WIDTH = 700;
  const HEIGHT = 700;

  export default {
    name: 'TreePad',
    data() {
      return {
        canvas: null,
        selectedNode: null
      };
    },
    mounted() {
      this.init();
    },
    computed: {
      ...mapState(['nodes'])
    },
    methods: {
      init() {
        this.canvas = new fabric.Canvas('pad');
        this.canvas.setDimensions({ width: WIDTH, height: HEIGHT });
        this.canvas.selection = false;

        document.documentElement.addEventListener('keydown', (e) => {
          if (this.selectedNode && (e.keyCode === 46 || e.keyCode === 8)) {
            this.removeTreeNode(this.selectedNode);
          }
        });

        this.addTreeNode((WIDTH / 2) - (RADIUS / 2), 50);
      },
      /**
       * Add a new tree node as a child of parentNode
       * @param x
       * @param y
       * @param parentNode
       * @return {{circle: *, line: *}}
       */
      addTreeNode(x, y, parentNode = null) {
        const circle = new fabric.Circle({
          radius: RADIUS,
          fill: parentNode ? '#fff' : '#bbecff',
          left: x,
          top: y,
          hasControls: false,
          hasRotatingPoint: false,
          selectable: !!parentNode,
          stroke: '#666',
          strokeWidth: 5
        });
        let line = null;

        // Draw a line to parent
        if (parentNode !== null) {
          line = new fabric.Line([circle.getCenterPoint().x, circle.getCenterPoint().y,
            parentNode.circle.getCenterPoint().x, parentNode.circle.getCenterPoint().y], {
            stroke: '#000',
            strokeWidth: 3,
            selectable: false,
            hoverCursor: 'default'
          });

          this.canvas.add(line);
          line.moveTo(parentNode.circle.get('zIndex') - 1);
        }

        circle.on('selected', () => {
          this.selectedNode = circle.get('node');
        });
        circle.on('deselected', () => {
          this.selectedNode = null;
        });

        circle.on('moving', ({ target }) => {
          const node = target.get('node');

          // Set line to parent
          if (line !== null) {
            line.set({
              x1: circle.getCenterPoint().x,
              y1: circle.getCenterPoint().y
            });
          }

          // Set lines to children
          const children = this.nodes.filter(n => n.parent === node);
          children.forEach((child) => {
            child.line.set({
              x2: circle.getCenterPoint().x,
              y2: circle.getCenterPoint().y
            });
          });
        });

        circle.on('mousedblclick', ({ target }) => {
          const node = target.get('node');
          const children = this.nodes.filter(n => n.parent === node);
          this.addTreeNode(target.getCenterPoint().x + (20 * children.length) + 1,
            target.getCenterPoint().y + 80, node);
        });

        this.canvas.add(circle);
        const node = { circle, line, parent: parentNode };
        node.circle.set('node', node);
        this.$store.commit('addNode', node);

        return node;
      },
      /**
       * Remove a tree node
       * @param node
       */
      removeTreeNode(node) {
        // Root is not allow to remove
        if (!node.parent) {
          return;
        }

        const children = this.nodes.filter(n => n.parent === node);
        children.forEach((child) => {
          this.removeTreeNode(child);
        });

        // Remove current node
        this.canvas.remove(node.circle);
        if (node.line) {
          this.canvas.remove(node.line);
        }
        this.$store.commit('removeNode', node);
      }
    }
  };
</script>

<style scoped>
  .pad {
    display: block;
    background-color: rgba(0, 0, 0, 0.08);
    border: 1px dashed rgba(0, 0, 0, 0.4);
  }
</style>
