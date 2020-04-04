const LinkedListNode = require('./LinkedListNode');
const Comparator = require('./Comparator');

class LinkedList {
    /**
     * @param {Function} comparatorFunction
     */
    constructor(comparatorFunction) {
        /**
         * @var {LinkedListNode}
         */
        this.head = null;
        /**
         * @var {LinkedListNode}
         */
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */
    prepend(value) {
        // make new node to be a head
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        // If there is no tail yet let's make new node a tail
        if (!this.tail)
            this.tail = newNode;
        return this;
    }


    /**
     * @param {*} value
     * @return {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value);

        // If there is no head yet let's make new node a head
        if (!this.head) {
            this.head = this.tail = newNode;
            return this;
        }

        // Attach new node to the end of linked list
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */
    delete(value) {
        if (!this.head)
            return null;

        let deletedNode = null;

        // If the head must be deleted then make next node that is differ
        // from the head to be a new head
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.deleteHead();
        }

        let curNode = this.head;
        if (curNode) {
            // If next node must be deleted then make next node to be a next next one
            while (curNode.next) {
                if (this.compare.equal(curNode.next.value, value)) {
                    deletedNode = curNode.next;
                    curNode.next = curNode.next.next;
                }
                else
                    curNode = curNode.next;
            }
        }

        // check if tail must be deleted
        if (this.compare.equal(this.tail.value, value))
            deletedNode = this.tail;

        return deletedNode;
    }

    find({value = undefined, callback = undefined}) {
        if (!this.head)
            return null;
        let curNode = null;
        while (curNode) {
            // If callback is specified then try to find node by callback
            if (callback && callback(curNode.value))
                return curNode;

            // If value is specified then try to compare by value
            if (value && this.compare.equal(curNode.value, value))
                return curNode;
            curNode = curNode.next;
        }

        return null;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteTail() {
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            // There is only node in linked list
            this.head = this.tail = null;
            return this.deleteTail;
        }

        // If there are many nodes in linked list
        // Rewind to the last node and delete "next" link for the node before the last one
        let curNode = this.head;
        while (curNode.next) {
            if (!curNode.next.next)
                curNode.next = null;
            else
                curNode = curNode.next;
        }

        this.tail = curNode;
        return deletedTail;
    }

    /**
     * @return {LinkedListNode}
     */
    deleteHead() {
        if (!this.head)
            return null;
        const deletedHead = this.head;

        if (this.head.next)
            this.head = this.head.next;
        else
            this.head = this.tail = null;
        return deletedHead;
    }

    /**
     * @param {*[]} values - Array of values that need to be converted to linked list
     * @return {LinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }

    /**
     * @return {LinkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let curNode = this.head;
        while (curNode) {
            nodes.push(curNode);
            curNode = curNode.next;
        }

        return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */

    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    /**
     * Reverse a linked list
     * @return {LinkedList}
     */
    reverse() {
        let curNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (curNode) {
            // Store next node.
            nextNode = curNode.next;
            // Change next node of the current node so it would link to previous node.
            curNode.next = prevNode;
            // Move prevNode and currNode nodes one step forward.
            prevNode = curNode;
            curNode = nextNode;
        }
        // Reset head and tail.
        this.tail = this.head;
        this.head = prevNode;
        return this;
    }
}

module.exports = LinkedList;
