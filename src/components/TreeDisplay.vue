<template>
  <div>
    <pre v-html="parseJson"></pre>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'TreeDisplay',
    computed: {
      parseJson() {
        let json = this.treeData;
        if (typeof json !== 'string') {
          json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return `<span class="${cls}">${match}</span>`;
        });
      },
      ...mapGetters(['treeData'])
    }
  };
</script>

<style lang="less">
  @import 'common.less';

  pre {
    .box-wrapper;
    padding: 10px;
    margin: 0;
  }

  .string {
    color: green;
  }

  .number {
    color: darkorange;
  }

  .boolean {
    color: blue;
  }

  .null {
    color: magenta;
  }

  .key {
    color: red;
  }
</style>
