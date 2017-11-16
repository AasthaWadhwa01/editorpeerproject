const { VM, NodeVM, VMScript } = require('vm2');

//method to execute the script using VM
function execute(testscript) {
    const vm = new NodeVM();

    let script = new VMScript(testscript);
    vm.run(script);
}
process.on('message', (testscript) => {
    execute(testscript)
    process.send('completed');
})