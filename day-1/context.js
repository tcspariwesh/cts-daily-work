function foo(a, b) {
    console.log(this);
    const outer= this;
    console.log(a, b);
    /* function inner(outerCtx) {
        console.log('inner context',outerCtx);
    }   */
}
inner = () =>{
    console.log('inner context',this);
}  
inner.apply(this) ;
// inner();
const cts = {};
cts.foo = foo;
cts.foo();//context is cts object
// console.log('-----------------------');

// foo(); //context is global object
// apply
// const customContext = { name: 'Pariwesh' };
// // foo.apply(customContext, [1,2,4]); //context is customContext object
// foo.call(customContext, 1, 2); //context is customContext object
// ES5 - object based , no class
//ES6 - object oriented , class