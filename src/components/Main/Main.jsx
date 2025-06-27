import React from 'react'
import { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context' 
const Main = () => {
  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);
  return (
    <div className="main">
        <div className="nav">
            <p>Saphire</p>
            <img src={assets.user_icon}/>
    </div>
        <div className="main-container">
          {!showResult?<>
          <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
          </div>
          <div className="cards" >
            <div className="card" onClick={()=>{setInput("Suggest beautiful places to see on upcoming road trip");}}>
              <p>Suggest beautiful places to see on upcoming road trip</p>
              <img src={assets.compass_icon}/>
            </div>
            <div className="card" onClick={()=>{setInput("Briefly summarize the concept of urban planning");}}>
              <p>Breifly summmarize the concept of urban planning</p>
              <img src={assets.bulb_icon}/>
            </div>
            <div className="card" onClick={()=>{setInput("Brainstorm team bonding activities for our next work retreat");}}>
              <p>Brainstorm team bonding activities for our next work retreat</p>
              <img src={assets.message_icon}/>
            </div>
            <div className="card" onClick={()=>{setInput("Tell me who created courage the cowardly dog");}}>
              <p>Tell me who created Courage the cowardly dog</p>
              <img src={assets.courage_icon}/>
            </div>
          </div>
          </>:
            <div className='result'> 
            <div className="result-title">
              <img src={assets.user_icon}/>
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt=''/>
              {loading?<>
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              </>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
              
            </div>
            </div>
          }
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
              <div><img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>onSent()}src={assets.send_icon} alt="" />:null}
              </div>
            </div>
            <p className='bottom-info'>Saphire may display inaccurate info,including about people, so double check its results </p>
          </div>
          
        </div>
    </div>
  )
}

export default Main