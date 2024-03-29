import { createContext, useState } from "react";
import runChat from "../Config/gemini"
export const Context =createContext();
 
const ContextProvider=(props)=>

{
    const [input , setInput]=useState("");
    const [recentPrompt,setRecentPrompt]= useState("");
    const [prevPrompts,setPrevPrompts]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");
const dealayPara= (index,nextWord)=>
{
     setTimeout(() => {
        setResultData(prev=>prev+nextWord)
     }, 75*index);
}

const newChat =()=>
{
    setLoading(false);
    setShowResult(false);
}
    const onSent=async(prompt)=>
    {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!=undefined)
        {
           response=await runChat(prompt);
           setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await runChat(input);
        }
        /*setRecentPrompt(input);
        setPrevPrompts(prev=>[...prev,input]);
         response= await runChat(input);*/
        let responsearray=response.split("**");
        let newResponse="";
        for(let i=0;i<responsearray.length;i++)
        {
            if(i===0 || i%2!==1)
            {
                newResponse+=responsearray[i];
            }
            else{
                newResponse+="<b>"+responsearray[i]+"</b>"
            }
        }
        let newResponse2=newResponse.split("*").join("</br>")
        let newResponsearray = newResponse2.split(" ")
        for(let i=0;i<newResponsearray.length;i++)
        {
            const nextWord = newResponsearray[i];
            dealayPara(i,nextWord+" ");
        }
        //setResultData(newResponse2);
        setLoading(false);
        setInput("")

       // await runChat(input);
    }
   // onSent("What is react js")
    const contextValue = {
          prevPrompts,
          recentPrompt,
          setPrevPrompts,
          onSent,
          setRecentPrompt,
          showResult,
          loading,
          resultData,
          input,
          setInput,
          newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider