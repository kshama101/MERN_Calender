import { useState } from 'react';
import './calculator.css';

function Calculator() {
  const ops = ['/', '*', '+', '.'];
  const [calc, setCalc] = useState("");

// if users click a button, the value of the button will apply to calc
  const updateCalc = value => {
    // if  value of button is /, *, + or . and cal is empty
    // if button is /, *, + or . and the last digit of cal is  /, *, + or .
    // button is - and last digit of cal is -
    // last digit of cal is - and button is /, *, + or .
     if(
       (ops.includes(value) && calc === '') || (
       ops.includes(value) && ops.includes(calc.slice(-1)))
       || (value==='-' && calc.slice(-1)===value)
       || ((calc.slice(-1)==='-')&& ops.includes(value))
     ) {
         return;
       }
     setCalc(calc==='0'?value:calc+value); 
   }
// it will add all the buttons from 1-9 in an array
  const createDigits = () =>{
    const digits = []; 
    
    for(let i= 1; i<10; i++){
      digits.push(
      <button 
        onClick={()=> updateCalc(i.toString())}
        key ={i}>{i}
      </button>
      )
    }
    return digits;
  }

  // To make the equal opretor work. When we press the equal operator this function will be called 
  const calculate =()=>{
    setCalc(eval(calc).toString());
  }
 
// if the calculation is empty string we return or we delete the last digit
  const deleteLast = () => {
    if(calc === ''){
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
  }

// If we have calculation then calc will be displayed otherwise 0
  return (
    <div className="App">
      <div className='calculator'>

         <div className='display'>
        { calc || "0"} 
         </div>

         <div className='operators'>
           <button onClick={()=>updateCalc('/')}> / </button>
           <button onClick={()=>updateCalc('*')}> * </button>
           <button onClick={()=>updateCalc('+')}> + </button>
           <button onClick={()=>updateCalc('-')}> - </button>
           <button onClick={deleteLast}>DEL</button>  
         </div>

         <div className='digits'>
            { createDigits()}  
           <button onClick={()=>updateCalc('0')}> 0 </button>
           <button onClick={()=>updateCalc('.')}> . </button>
           <button onClick={calculate}> = </button>
         </div>

      </div>
    </div>
  );
}

export default Calculator;
