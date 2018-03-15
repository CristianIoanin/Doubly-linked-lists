// DList Class
// Given the above reference implementations for doubly linked node and doubly linked list, 
// can you construct the rest of a basic dList class? 
// This would include dList methods push(), pop(), front(), back(), contains(), and size(). 

// Second: implement these so that they are available as standalone functions as well as methods on both dlNode and dList classes.

//node constructor function and its methods
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

dlNode.prototype.push = function(value) {
    const node = new dlNode(value);
    let current = this;

    while(current.next) {
        current = current.next;
    }
    current.next = node;
    node.prev = current;

    return this;
};

dlNode.prototype.pop = function() {
    let current = this;
    let runnerUp;
    if(!current.next) return null;

    while(current.next) {
        current = current.next;
        runnerUp = current.prev;
    }
    runnerUp.next = null;
    current.prev = null;
    return current;
};

dlNode.prototype.front = function() {
    return this;
};

dlNode.prototype.back = function() {
    let current = this;

    while(current.next) {
        current = current.next;
    }
    return current;
};

dlNode.prototype.contains = function(value) {
    let current = this;

    while(current) {
        if(current.val === value) {
            return true;
        }
        current = current.next;
    }
    return false;
};

dlNode.prototype.size = function() {
    let current = this;
    let length = 0;

    while(current) {
        length++;
        current = current.next;
    }
    return length;
};



//create some linked nodes to play with
const node1 = new dlNode(1);

function loopToLinkNodes(firstNode) {
    let current = firstNode;

    for(let i = firstNode.val + 1; i < firstNode.val + 5; i++) {
        let newNode = new dlNode(i);
        current.next = newNode;
        newNode.prev = current;

        current = newNode;
    }
    return firstNode;
}

loopToLinkNodes(node1);

console.log(
    `Methods for dlNode objects: \n`,
    `.push() method adds a new node to the last, at the end of it and returns first node with all subsequent links: \n`,
    node1.push(9),`\n`,
    `.pop() method pops last node and returns it: \n`,
    node1.pop(),`\n`,
    `.front() method returns first node (it actually assumes the first node is passed as an argument) : \n`,
    node1.front(),`\n`,
    `.back() method returns last node: \n`,
    node1.back(),`\n`,
    `contains(value) method returns if value is available or not within any of the linked nodes: \n`,
    `contains 12: `,
    node1.contains(4),`\n`,
    `contains 19: `,
    node1.contains(0),`\n`,
    `size() method returns the size or length of the list: \n`,
    node1.size()
);

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
myList.push(11);
myList.push(12);
myList.push(13);
myList.push(14);
myList.push(15);

console.log(
    `.pop() method pops list's tail and returns it: \n`,
    myList.pop(),`\n`,
    `.front() method returns list's head: \n`,
    myList.front(),`\n`,
    `.back() method returns list's tail: \n`,
    myList.back(),`\n`,
    `contains(value) method returns if value is available or not inside the list: \n`,
    `contains 12: `,
    myList.contains(12),`\n`,
    `contains 19: `,
    myList.contains(19),`\n`,
    `size() method returns the size or length of the list: \n`,
    myList.size()
);


// Standalone function versions of push(), pop(), front(), back(), contains(), and size()
//standalone push()
function push (list, value) {
    const node = new dlNode(value);

    if(!list.head) {
        list.head = node;
        list.tail = node;
    } else {
        list.tail.next = node;
        node.prev = list.tail;
        list.tail = node;
    }
    return list;   
}

push(myList, 99);
push(myList, 100);
console.log(push(myList, 101));


//standalone pop()
function pop(list) {
    if(!list.head) {
        return 'List is empty!';
    }

    let current = list.tail;

    while (current) {
        if (current.prev === null) {
            list.head = null;
            list.tail = null;
            return current;
        } else {
            list.tail = current.prev;
            list.tail.next = null;
            current.prev = null;
            return current;
        }
        current = current.prev;
    }
}

console.log(pop(myList));
console.log(pop(myList));


//standalone front()
function front(list) {
    if(!list.head) {
        return 'List is empty!';
    } else {
    return list.head;
    }
}


//standalone back()
function back(list) {
    if(!list.head) {
        return 'List is empty!';
    } else {
    return list.tail;
    }
}

console.log(front(myList));
console.log(back(myList));


//standalone contains()
function contains(list, value) {
    let current = list.head;

    while(current){
        if(current.val === value) {
            return true;
        }
        current = current.next;
    }
    return false;
}

console.log(contains(myList, 99));


//standalone size()
function size(list) {
    let length = 0;
    let current = list.head;

    if(!current) {
        return length;
    } else {
        while(current) {
            length++;
            current = current.next;
        }
    }
    return length;
}

console.log(size(myList));