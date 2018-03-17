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

const node1 = new dlNode(1);
const node2 = new dlNode(2);
const node3 = new dlNode(3);
const node4 = new dlNode(4);
const node5 = new dlNode(5);

node1.prev = null;
node1.next = node2;

node2.prev = node4; //node2's prev points back to node4, instead of node1
node2.next = node3;

node3.prev = node2;
node3.next = node4;

node4.prev = node3;
node4.next = node5;

node5.prev = node4;
node5.next = node3; //node5, the next to be defined as list's tail, point back to node3, instead of null


const myList = new dList();
myList.head = node1;
myList.tail = node5;


const node11 = new dlNode(11);
const node22 = new dlNode(22);
const node33 = new dlNode(33);
const node44 = new dlNode(44);
const node55 = new dlNode(55);

node11.prev = null;
node11.next = node22;

node22.prev = node11;
node22.next = node33;

node33.prev = node22;
node33.next = node44;

node44.prev = node33;
node44.next = node55;

node55.prev = node44;
node55.next = null; 


const my2ndList = new dList();
my2ndList.head = node11;
my2ndList.tail = node55;

//breadcrumb trail approach for
// Loop Start
// Given a dList that may contain a loop, return a pointer to the node where the loop begins (or null if no loop).
// Given: (1) <--> (2) <--> (3) <--> (node (3) points back to the first node)
// Return: (3) (return the node, which starts the loop, in this case, node 3 is starting the loop because it points back to node1)

//I'm attempting to check the double loop

function loopStart(list) {
    let current = list.head;
    const loopEvaluation = {
        movingForwardCheck: {loop: false, loopStart: null},
        movingBackwardsCheck: {loop: false, loopStart: null}
    };

    //check for possible loop occurrence while moving forward through next property
    while(current.next) {
        let loopSuspect = current;
        current.up = true;
        
        current = current.next;
        if(current.up) {
            loopEvaluation.movingForwardCheck.loop = true;
            loopEvaluation.movingForwardCheck.loopStart = loopSuspect;
            break;
        }
    }
    //check for possible loop occurrence while moving backwards through prev property
    current = list.tail;
    while(current.prev) {
        let loopSuspect = current;
        current.down = true;
        
        current = current.prev;
        if(current.down) {
            loopEvaluation.movingBackwardsCheck.loop = true;
            loopEvaluation.movingBackwardsCheck.loopStart = loopSuspect;
            break;
        }
    }

    //delete properties added just for the loop evaluation
    current = list.head;
    while(current) {
        if(!current.up) break;
        delete current.up;
        current = current.next;
    }
    current = list.tail;
    while(current) {
        if(!current.down) break;
        delete current.down;
        current = current.prev;
    }

    return loopEvaluation;
}

console.log(loopStart(myList));
console.log(loopStart(my2ndList));
'\n';

function checkifLoopForward(list) {
    let walker = list.head;
    let runner = list.head;
    
    while(runner.next) {
        walker = walker.next;
        runner = runner.next.next;

        if(walker === runner) { //loop detected
            walker = list.head;
            break;
        }  
    }
    while(runner.next) {
        let culprit = runner;
        walker = walker.next; 
        runner = runner.next; //change pace so that pointers meet again, this time at loop's starting point

        if(walker === runner) return culprit;
    }
    return false;
}

function checkifLoopBacwards(list) {
    let walker = list.tail;
    let runner = list.tail;
    
    while(runner.prev) {
        walker = walker.prev;
        runner = runner.prev.prev;

        if(walker === runner) { //loop detected
            walker = list.tail;
            break;
        }  
    }
    while(runner.prev) {
        let culprit = runner;
        walker = walker.prev; 
        runner = runner.prev; //change pace so that pointers meet again, this time at loop's starting point

        if(walker === runner) return culprit;
    }
    return false;
}

console.log(checkifLoopForward(myList)); //node5 starts the loop
console.log(checkifLoopForward(my2ndList)); //false

console.log(checkifLoopBacwards(myList)); //node2 starts the loop
console.log(checkifLoopBacwards(my2ndList)); //false
'\n';