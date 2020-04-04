const LinkedList = require('./LinkedList');

let linkedList = new LinkedList();

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
linkedList.append(6);

linkedList.reverse();
console.log(linkedList.toString());
