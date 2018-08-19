/**
 * Tree operation method
 */

class TreeUtils {
  constructor() {
    this.initID = 0;
  }

  /**
   * Build Tree JSON Object
   * @param nodes
   */
  buildTreeJson(nodes) {
    this.initID = 0;
    if (nodes.length === 0) {
      return {};
    }
    // By default, the first element is the root
    return this.generateNode(nodes[0], nodes);
  }

  newNode() {
    this.initID += 1;
    return {
      id: this.initID,
      children: []
    };
  }

  generateNode(node, nodes) {
    const result = this.newNode();

    result.children = this.generateChildren(node, nodes);

    return result;
  }

  generateChildren(node, nodes) {
    const result = [];
    nodes.filter(n => n.parent === node).forEach((n) => {
      result.push(this.generateNode(n, nodes));
    });
    return result;
  }
}

export default TreeUtils;
