import React from 'react'
import {logo} from '../assets'
function Hero() {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between w-full mb-10 pt-3 '>
            <img src={logo} alt='logo' className='w-32'/>
            <button className='black_btn' type='button' onClick={()=>window.open('https://github.com')}>Github</button>
        </nav>
        <h1 className='text-4xl font-bold text-center'>Welcome to our website</h1>
        <h1 className='head_text'>Summarize your work with
            <br className='max-md:hidden'/>
            <span className='orange_gradient'> Open AI GPT-4 </span>
            </h1>
            <h2 className='desc'>
                Our AI-powered text summarizer uses advanced natural language processing techniques to condense lengthy articles and texts into concise summaries. With the help of Open AI GPT-4, you can now extract key information and main points from any document, saving you time and effort. Experience the power of AI summarization today!
            </h2>
    </header>
  )
}

export default Hero