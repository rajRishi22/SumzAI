import React from 'react'
import { useLazyGetSummaryQuery } from '../services/article';
import { useState,useEffect } from 'react'
import {copy,linkIcon,loader,tick} from '../assets'
function Demo() {
    const [article,setArticle] = useState({
        url:'',
        summary:'',
    });
    const [allArticles,setAllArticles] = useState([]);
    const [copied,setCopied] = useState("");
    const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery();

    useEffect(()=>{
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage);
        }
    },[]);
    const handleSubmit= async(e)=>{
        // fetch data from the API
        // set the article state
        e.preventDefault();
        const {data}= await getSummary({articleUrl:article.url});
        if(data.summary){
            const newArticle = {...article,summary:data.summary};
            const updatedAllArticles = [newArticle,...allArticles];
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
        }
    }


    const handleCopy = (copyUrl)=>{
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(()=>{
            setCopied(false);
        },3000);
    }
  return (
    <section className='mt-15 w-full max-w-xl'>
        <div className='flex flex-col w-full gap-2'>
            <form className='relative flex justify-center items-center'
            onSubmit={handleSubmit}
            >
            <img src={linkIcon} alt='link_icon' className='absolute left-0 w-5 my-3 ml-3 mt-4'/>
            <input type='url' placeholder='Enter a URL' value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})} required className='url_input peer'/>
            <button type='submit' className='submit_btn' peer-focus:border-gray-700 peer-focus:text-gray-700>
                Enter
            </button>
            </form>

            {/* Browse URL History*/}
            <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                {allArticles.map((item,index)=>(
                    <div key={`link-${index}`}
                    onClick={()=>setArticle(item)}
                    className="link_card"
                    >
                    <div className='copy_btn' onClick={()=>handleCopy(item.url)}>
                        <img src={copied===item.url ? tick : copy } alt="copy_icon"
                        className='w-[40%] h-[40%] object-contain ' />
                    </div>
                    <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}
                    </p>
                    
                    </div>
                ))}
            </div>

        </div>

        {/* Display the Results */}
            <div className='my-10 max-w-full justify-center flex items-center'>
                {isFetching ? (<img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
                ):error?(
                    <p>
                        We have got an error
                        <br/>
                        {error?.data?.error}

                    </p>
                ):(
                    article.summary && (
                        <div className='flex flex-col gap-3 text-xl'>
                            <h2 className='font-satosahi font-bold'>
                                Article <span className='blue_graident'> Summary </span>
                            </h2>
                            <div className='summary_box'>
                                <p className='font-inter font-medium'>{article.summary}</p>
                            </div>
                        </div>
                    )
                )
            }

            </div>

    </section>  
  )
}

export default Demo