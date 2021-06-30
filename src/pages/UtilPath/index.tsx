// dependencies
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

// images
import LogoGitHub from '../../assets/GitHub-Mark-120px-plus.png'

// styles
import './styles.scss'

// types
interface IFinalUrl {
  id: string;
  url: string;
}

export default function UtilPage(){
  const [ hash, setHash ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ finalUrl, setFinalUrl ] = useState<IFinalUrl[]>([])

  function handleClearHash(){
    setHash('')
  }

  function handleClearUrl(){
    setUrl('')
  }

  function handleClearAll(){
    setHash('')
    setUrl('')
    setFinalUrl([])
  }

  function handleCreatePath(){
    setFinalUrl([...finalUrl, {id: uuid(), url:`${url.slice(34)}#${hash.slice(0,10)}`}])
  }

  function handleCopyToClipBoard(){
    let  textToCopy = ''
    finalUrl.map(({url}: IFinalUrl): void => {
      textToCopy = url  + `\n\n` + textToCopy
    })

    navigator.clipboard.writeText(textToCopy)
  }
 
  return(
    <div className='content'>
      <div className='presentation'>
        <img src="https://avatars.githubusercontent.com/andersonandrad" alt="github.com/andersonandrad" />
        <span>Create by: Anderson Andrade</span>
        <span>Description: Util to use in my work</span>
        <div className='links'>
          <div className='icons'>
            <a href="https://github.com/andersonandrad">
              <img src={LogoGitHub} alt="" />
              <span>Anderson Andrade</span>
            </a>
          </div>
        </div>
      </div>
      <div className='inputs'>
        <div>
          <input type="text" className='mediumInput' onChange={event => setHash(event.target.value)} value={hash}  placeholder='Ex: cacd93256a06a32001c467ed29734e946a9b8'/>
          <div className='buttons'>
            <button className='clearButton' onClick={handleClearHash}>Clear hash</button>
          </div>
        </div>
        <div>
          <input type="text" onChange={event => setUrl(event.target.value)} value={url} placeholder='Ex: https://system.intranet.bb.com.br/rest-of-url'/>
          <div className='buttons'>
            <button className='clearButton' onClick={handleClearUrl}>Clear path</button>
            <button className='confirmationButton' onClick={handleCreatePath}>Add</button>
          </div>
        </div>
      </div>
      <div className='paths'>
        {finalUrl.length > 0 && (
          <div className='headerPaths'>
            <span>Quantity {finalUrl.length}</span>
            <div>
                <button className='clearButton' onClick={handleClearAll}>Clear all</button>
                <button onClick={handleCopyToClipBoard}>Copy</button>
            </div>
          </div>
        )}
        
        {finalUrl.map(url => {
          return (
            <div key={url.id} className='contentPath'>
              {url.url}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// https://fontes.intranet.bb.com.br/ath/ath-qmassa-qrobo-api/ath-qmassa-qrobo-api/-/blob/f37cacd93256a06a32001c467ed29734e946a9b8/src/app/controllers/BlockPhoneNumber.controller.ts
// cacd93256a06a32001c467ed29734e946a9b8