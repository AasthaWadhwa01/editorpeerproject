const { VM, NodeVM, VMScript } = require('vm2');

//method to execute the script using VM
function execute(testscript, err) {
    const vm = new NodeVM();
    let script;
    script = new VMScript(testscript);
    try {
        eval(vm.run(script));
        process.send('completed')
    } catch (error) {
        console.log(error.message);
        process.send('error')
    }
}

process.on('message', (testscript, err) => {
    execute(testscript)
})