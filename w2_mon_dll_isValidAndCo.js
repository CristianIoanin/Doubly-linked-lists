// DList Class

//node constructor function
function dlNode(value)
{
  if (!(this instanceof dlNode)) 
  {
    return new dlNode(value);
  }
  this.val = value;
  this.prev = null;
  this.next = null;
}

//doubly-list constructor function and its methods
function dList()
{
  if (!(this instanceof dList)) 
  {
    return new dList();
  }
  this.head = null;
  this.tail = null;
}

dList.prototype.push = function(value) {
    const node = new dlNode(value);

    if(!this.head) {
        this.head = node;
        this.tail = node;
    } else {
        
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
    return node;
    
};

dList.prototype.pop = function() {
    if(!this.head) {
        return 'List is empty!';
    }

    let current = this.tail;

    while (current) {
        if (current.prev === null) {
            this.head = null;
            this.tail = null;
            return current;
        } else {
            this.tail = current.prev;
            this.tail.next = null;
            current.prev = null;
            return current;
        }
        current = current.prev;
    }
};

dList.prototype.front = function() {
    if(!this.head) {
        return 'List is empty!';
    } else {
    return this.head;
    }
};

dList.prototype.back = function() {
    if(!this.head) {
        return 'List is empty!';
    } else {
    return this.tail;
    }
};

dList.prototype.contains = function(value) {
    let current = this.head;

    while(current){
        console.log(current);
        if(current.val === value) {
            return true;
        }
        current = current.next;
    }
    return false;
};

dList.prototype.size = function() {
    let length = 0;
    let current = this.head;

    if(!current) {
        return length;
    } else {
        while(current) {
            length++;
            current = current.next;
        }
    }
    return length;
};


//creating a list and playing with it
const myList = new dList();
myList.push(101);
myList.push(102);
myList.push(103);
myList.push(104);
myList.push(105);

const someList = new dList();


// Prepend Value
// Given dList, new value, and existing value, insert new val into dList immediately before existing val. 
// prependValue(list, 9, 4)
// Given: (1) <--> (2) <--> (3) <--> (4) 
// Return: (1) <--> (2) <--> (3) <-->(9) <--> (4)

function prependValue(list, prefix, value) {
    const node = new dlNode(prefix);
    let current = list.head;

    if(!current) return null;

    if(current.val === value) {
        current.prev = node;
        node.next = current;
        list.head = node;
        return true;
    }

    while(current.next) {
        if(current.next.val === value) {
            const before = current;
            const after = current.next;

            before.next = node;
            after.prev = node;
            node.next = after;
            node.prev = before;

            return true;
        }
        current = current.next;
    }
    return false;
}

console.log(prependValue(myList, 99, 102)); //true
console.log(prependValue(myList, 99, 105)); //true
console.log(prependValue(myList, 99, 100)); //false
console.log(prependValue(someList, 99, 102)); //null


// Kth To Last Value 
// Given k, return the value ‘k’ from a dList’s end. (K from last meaning # of nodes away from the last node.)
// kthToLast(list, k)
// Given: (1) <--> (2) <--> (3) <--> (4) , 2 
// (last node being (4), return the node 2 positions before the last node, in this case the node (2))
// Return: (2)

function kthToLast(list, k) {
    let current = list.tail;
    let count = 0;

    while(count < k) {
        if(!current) return null;

        current = current.prev;
        count++;
    }
    return current.val;
}

console.log(kthToLast(myList, 1)); //99
console.log(kthToLast(myList, 2)); //104
console.log(kthToLast(myList, 4)); //102
console.log(kthToLast(myList, 10)); //null


// Is Valid dList
// Determine whether given dList is well-formed and valid: whether next and prev pointers match, etc. 
// Given: (1) <--> (2) <--> (3) <--> (4)
// Return: true
// Given:  (1) <--> (2) <--> (3)  x--> (4) (Node 4 is missing it’s prev pointer)
// Return: false

//a simple, and OK-ish list
var node1 = {val: 1, prev: null, next: node2};
var node2 = {val: 2, prev: node1, next: node3};
var node3 = {val: 3, prev: node2, next: null};

const simpleList = new dList();
simpleList.head = node1;
node1.next = node2;
node2.next = node3;
simpleList.tail = node3;

//an empty, but OK list
const emptyList = new dList();

//a simple, but not that OK list
var node1 = {val: 1, prev: null, next: node2};
var node2 = {val: 2, prev: node1, next: node3};
var node3 = {val: 3, prev: null, next: null};

const anotherSimpleList = new dList();
anotherSimpleList.head = node1;
node1.next = node2;
node2.next = node3;
anotherSimpleList.tail = node3;



function isValid(list) {
    let valid = false;
    let current = list.head;

    if((list.head && list.tail) || (!list.head && !list.tail)) valid = true;

    if(list.head && list.tail) {
        if(list.head.prev !== null && list.tail.next !== null) valid = false;
    }

    while(current && current.next) {
        if(current.next.prev !== current) valid = false;
        current = current.next;
    }
    return valid;
}

console.log(isValid(simpleList)); //true
console.log(isValid(emptyList)); //true
console.log(isValid(anotherSimpleList)); //false


// Palindrome
// Determine whether a dList is a palindrome
// Given: (1) <--> (2) <--> (3) <--> (2) <--> (1)
// Return: true
// Given: (1) <--> (2) <--> (2) <--> (1)
// Return: true
// Given: (1) <--> (2) <--> (3) <--> (1)
// Return: false

const listOne = new dList();
listOne.push(1);
listOne.push(2);
listOne.push(3);
listOne.push(4);
listOne.push(3);
listOne.push(2);
listOne.push(1);

const listTwo = new dList();
listTwo.push(1);
listTwo.push(2);
listTwo.push(3);
listTwo.push(4);
listTwo.push(2);
listTwo.push(1);

function middleNode(list) {
    let current = list.head;
    let runnerUp = list.head;

    while(current && current.next) {
        current = current.next.next;
        runnerUp = runnerUp.next;
    }
    return runnerUp;
}

// console.log(middleNode(listOne)); //4

function isPalindrome(list) {
    let runnerUp = list.head;
    let runnerDown = list.tail;
    const middle = middleNode(list);

    while(runnerUp !== middle) {
        if(runnerUp.val !== runnerDown.val) return false;
        runnerUp = runnerUp.next;
        runnerDown = runnerDown.prev;
    }
    return true;
}

console.log(isPalindrome(listOne)); //true
console.log(isPalindrome(listTwo)); //false

// Loop Start
// Given a dList that may contain a loop, return a pointer to the node where the loop begins (or null if no loop).
// Given: (1) <--> (2) <--> (3) <--> (node (3) points back to the first node)
// Return: (3) (return the node, which starts the loop, in this case, node 3 is starting the loop because it points back to node1)

// To be continued...