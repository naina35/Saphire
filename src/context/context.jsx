import { createContext,useState } from "react";
import main from "../config/gemini";
export const Context=createContext();
const ContextProvider=(props)=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },7.5*index);
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }
    const onSent=async(prompt)=>{
        console.log(prompt,input);
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){
            response=await main(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await main(input);
        }
        let responseArray=response.split("**");
        let newRes="" ;
        for(let i=0;i<responseArray.length;i++){
            if(i==0|| i%2!==1)newRes+=responseArray[i];
            else newRes+="<b>"+responseArray[i]+"</b>";
        }
        let newResponse2=newRes.split("*").join("</br>");
        let newResArray=newResponse2.split(" ");
        for(let i=0;i<newResArray.length;i++){
            const nextWord=newResArray[i];
            delayPara(i,nextWord+" ");
        }
        setLoading(false);
        setInput("");
        setRecentPrompt(input);
    }

    const contextValue={
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;