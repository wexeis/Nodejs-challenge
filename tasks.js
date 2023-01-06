
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  // taskStatus(tasks);
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.slice(0,5) === 'hello'){
    hello(text);
  }

  else if(text === 'help\n'){
    help();
  }

  else if (text === 'list\n'){
    
    listTasks(tasks);
   
    
    
  }

  else if(text.slice(0,3) === 'add'){
    
    addTask(text.slice(4, text.length).replace("\n",""));
    
  }
  else if (text.slice(0,6) === "remove"){
    
    remove(tasks, text);
   
    
  }

  else if (text.slice(0,4) === "edit"){
    editTask(tasks, text.replace("\n",""));
    
  }

  else if (text.slice(0,5) === "check"){
   
    check(tasks, text);
  }

  else if (text.slice(0,7) === "uncheck"){
   
    uncheck(tasks, text);
  }
  else{
    unknownCommand(text);
  }
  
}
var tasks = [
 
];
/**
 *  help, lists all possible commands
 * command to exit = exit or quit
 * command for greetings = hello + your name
 *
 * 
 */




 function check(arr, arg){
if(arg.slice(5, arg.length).trim().length === 0){
  console.log("Error, provide task number")
}
else{
 
  arr[Number(arg.slice(5, arg.length)) - 1].done = "[✓]"
}
 }

 function uncheck(arr, arg){
  if(arg.slice(7, arg.length).trim().length === 0){
    console.log("Error, provide task number")
  }
  else{
   
    arr[Number(arg.slice(7, arg.length)) - 1].done = "[ ]"
  }
   }


function help(){

  console.log('command to exit= exit or quit \ncommand to say hello! = hello');
}
/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  let noSpace = text.trim() 
  console.log(noSpace + "!")
}

/*list tasks function
command list
*/

function listTasks(arr) {

  
  console.log('\nTasks:\n');
  tasks.forEach(object => {
    console.log(`${object.id}: ${object.name} ${object.done}\n`);
  });
}

function addTask(task) {

  if (task.trim().length === 0 ) {
    console.error('\nError: No task name provided\n');
    return;
  }
  else{
  tasks.push({
    id: tasks.length + 1,
    name: task,
    done: "[ ]"
  });
  }
  console.log(`Task "${task}" added to the list`);
  console.log(tasks)
}
/*
remove tasks 
command remove + task order
*/ 
function remove(arr, arg) {
 
if(arg.trim().length === 6){

 
 

  arr.splice(arr.length - 1, 1)

  
  console.log('\nupdated tasks:\n')
  arr.forEach(object => {
    console.log( `${object.id}: ${object.name} ${object.done}\n`);
 });
}


 else if (arg.slice(6, arg.lenght).trim() > arr.length ) {
 
  
  console.log("\ntask do not exist\n");

}
  



else{
 
 
 arr.splice(arg.slice(6, arr.lenght).trim() -1, 1)

  for (let i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
    
  }
  console.log('\nupdated tasks:\n')
  arr.forEach(object => {
  console.log( `${object.id}: ${object.name} ${object.done}\n`);
 })
}

}




 

// edit

function editTask(arr, arg) {
  let words = arg.split(' ');

  if (words.length < 2) {
    console.log('\nError: Enter task number\n');
  }

  else if  (words.length > 2 && Number(words[1]) > arr.length) {
    console.log("\ntask number do not exist\n")
    
  }

else if (words.length > 1 && Number(words[1]) > 0) {
  let words1 = words.splice(0, 2)

  
    arr[Number(words1[1]) - 1].name = words.join(' ');

    console.log('\nedited tasks:\n')
  arr.forEach(object => {
  console.log( `${object.id}: ${object.name} ${object.done}\n`)
    })
  }
 

   
    
else {
  let words2 = words.splice(0, 1)
  arr[arr.length - 1].name = words.join(' ')

  console.log('\nedited tasks:\n')
  arr.forEach(object => {
  console.log( `${object.id}: ${object.name} ${object.done}\n`)
    })
  
}
}




/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Mohamad Moughnie")
