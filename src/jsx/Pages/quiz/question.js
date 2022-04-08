import React,{useEffect} from 'react'
const Question = (props) => {
  const stripUserHandles =(string)=> {
    let e = document.createElement('textarea');
    e.innerHTML = string;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  useEffect(() => {
   // speak({ text: stripUserHandles(props.data.question) })
  }, [props]);
  
    return (
        <div >
           <p className='text-lg text-black'>{stripUserHandles(props.data.question)}</p>
        </div>
    )
}

export default Question
