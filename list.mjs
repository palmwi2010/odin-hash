import Node from "./node.mjs";

class LinkedList {

    constructor() {
        this.head = new Node();
    }

    findLastNode() {
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
        return curr;
    }

    append(key, value) {
        let lastNode = this.tail();
        if (lastNode.value === null) {
            lastNode.key = key;
            lastNode.value = value;
        } else {
            lastNode.next = new Node(key, value);
        }
    }

    update(key, value) {
        let curr = this.head;
        while (curr.next != null && curr.key != key) {
            curr = curr.next;
        }
        if (curr.key === key) {
            curr.value = value;
        } else if (curr.value === null) {
            curr.key = key;
            curr.value = value;
        } else {
            curr.next = new Node(key, value);
        }
    }

    prepend(key, value) {
        const newHead = new Node(key, value);
        newHead.next = this.head;
        this.head = newHead;
    }

    size() {
        let curr = this.head;
        let counter = 0;
        while (curr != null) {
            if (curr.value != null) counter++;
            curr = curr.next;
        }
        return counter;
    }

    head() {
        return this.head;
    }

    tail() {
        let curr = this.head;
        while (curr.next != null) {
            curr = curr.next;
        }
        return curr;
    }

    at(index) {
        let counter = 0;
        let curr = this.head;

        while (curr != null) {
            if (counter === index) return curr;
            counter++;
            curr=curr.next;
        }
        return null;
    }

    pop() {
        let curr = this.head;
        const length = this.size();
        for (let i = 0; i < length - 2; i++) {
            curr = curr.next;
        } 
        curr.next = null;
        return this
    }

    contains(key) {
        let curr = this.head;
        while (curr != null) {
            if (curr.key === key) return true;
            curr = curr.next;
        }
        return false;
    }

    find(key) {
        let curr = this.head;
        let counter = 0;
        while (curr != null) {
            if (curr.key === key) return counter;
            counter++;
            curr = curr.next;
        }
        return null;
    }

    get(key) {
        let curr = this.head;
        while (curr != null) {
            if (curr.key === key) return curr.value;
            curr = curr.next;
        }
        return null;
    }

    remove(key) {
        let curr = this.head;
        if (curr.key === key) {
            this.head = curr.next;
            return true;
        }
        let next = this.head.next;
        while (next != null) {
            if (next.key === key) {
                curr.next = next.next;
                return true;
            }
            curr = curr.next;
            next = next.next;
        }
        return false;
    }

    toString() {
        let curr = this.head;
        let output = '';

        while (curr != null && curr.value != null) {
            output += `( ${curr.key}: ${curr.value} ) -> `
            curr = curr.next;
        }
        output += 'null';
        return output;
    }

    keys() {
        let keys = [];
        let curr = this.head;
        while (curr != null) {
            if (curr.key != null) keys.push(curr.key);
            curr = curr.next;
        }
        return keys;
    }

    values() {
        let values = [];
        let curr = this.head;
        while (curr != null) {
            if (curr.value != null) values.push(curr.value);
            curr = curr.next;
        }
        return values;
    }

    items() {
        let items = [];
        let curr = this.head;
        while (curr != null) {
            if (curr.key != null) items.push([curr.key, curr.value]);
            curr = curr.next;
        }
        return items;
    }
}

export default LinkedList;