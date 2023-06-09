import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState(false)
  const [handle, setHandle] = useState(true)

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    // console.log('Handle Submitted');
    axios.get(url).then((res) => {
      setMyData(res.data);
    }).catch((err) => {
      setError(err)
    })
    setHandle(false)
  };
  const meaning = myData[0]?.meanings[0];
  return (
    <>
      <Head>
        <title>Simple Dictionary</title>
        <meta name="dictionary" content="Best Free Dictionary for everyone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className='h-screen w-full bg-slate-400 flex flex-col items-center'>
        <div className='w-full bg-white p-4 shadow-2xl'>
          <form className='flex justify-center' onSubmit={hanldeSubmit}>
            <input className='bg-slate-300 outline-none border-none px-2 w-3/4 mr-12 py-1 rounded-full' type="text" placeholder="Please Enter your Keyword" onChange={handleChange} />
            <button type="submit" className='px-4 py-1 bg-slate-400 rounded-full text-white'>submit</button>
          </form>
        </div>

        <div className="page w-3/4 bg-white mt-6 rounded-md shadow-2xl p-4">
          {error ? <h2>No Word found for : {input}</h2> :
            handle ? <h1 className='p-2 bg-yellow-100 rounded-full'>Please Enter your Word in Search Bar to get yuor results.</h1> :
              myData.length > 0 && (
                <div>
                  <div className="firstline flex justify-around">
                    <h1 className='text-red-600 text-xl capitalize'>{myData[0].word}</h1>
                    <p className="phonetic">{myData[0].phonetic}</p>
                    <audio key={myData[0].word} controls>
                      {myData[0].phonetics.map((phonetics, index) => (
                        <source key={index} src={phonetics.audio} type="audio/mpeg" />
                      ))}
                    </audio>
                  </div>
                  {/* {myData[0].meanings.map((meaning) => ( */}
                  <div>
                    <div className='p-3 bg-slate-100 mt-4 pl-4 rounded-lg'>
                      <h1 className='text-blue-600 font-bold text-lg'>Defination : </h1>
                      <p>{meaning.definitions[0].definition}</p>
                    </div>
                    <div className='p-3 bg-slate-100 mt-4 pl-4 rounded-lg'>
                      <h1 className='text-blue-600 font-bold text-lg'>Synonyms : </h1>
                      {meaning.synonyms && meaning.synonyms.length > 0 ? (
                        <p>{meaning.synonyms.join(' , ')}</p>
                      ) : (
                        <p className='text-red-500'>No Synonyms are availale for : <span className='font-bold text-lg text-black uppercase'>{input}</span></p>
                      )}
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              )}
        </div>
      </div>

    </>
  );
}
