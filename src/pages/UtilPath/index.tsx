import GithubIcon from '../../assets/GitHub-Mark-120px-plus.png'
import styles from './styles.module.scss'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

interface IFinalUrl {
  id: string
  url: string
  task: string
  typeFile: string
  isCopied: boolean
}

export default function UtilPage () {
  const [hash, setHash] = useState( '' )
  const [url, setUrl] = useState( '' )
  const [task, setTask] = useState( '' )
  const [finalUrl, setFinalUrl] = useState<IFinalUrl[]>( [] )

  function handleClearHash () {
    setHash( '' )
  }

  function handleClearTask () {
    setTask( '' )
  }

  function handleClearList () {
    setFinalUrl( [] )
  }

  function setWithCopied ( id: string ) {
    const newFinalUrl = [...finalUrl]
    const index = newFinalUrl.findIndex( item => item.id === id )
    newFinalUrl[index].isCopied = true
    setFinalUrl( newFinalUrl )
  }

  function handleCreatePath () {
    const newURl = `${url.slice( 34 )}#${hash.slice( 0, 10 )}`
    setFinalUrl( [{ id: uuid(), url: newURl, task, typeFile: url.slice( url.length - 10 ).split( '.' )[1], isCopied: false }, ...finalUrl] )
    setUrl( '' )
  }

  function handleCopyToClipBoard () {
    let textToCopy = ''
    finalUrl.map( ( { url }: IFinalUrl ): void => {
      textToCopy = url + `\n\n` + textToCopy
    } )

    navigator.clipboard.writeText( textToCopy )
  }

  return (
    <div className={styles.container}>
      <header>
        <div>
          <h1>Util Work</h1>
          <div>
            <section onClick={() => window.open( 'https://github.com/AndersonAndrad', '_blank' )}>
              <img src={GithubIcon} alt="" />
              <span>Anderson Andrad</span>
            </section>
            <section onClick={() => window.open( 'https://keepo.io/AndersonAndrad', '_blank' )}>
              <span>All my links</span>
            </section>
          </div>
        </div>
        <img src="https://avatars.githubusercontent.com/andersonandrad" alt="" />
      </header>

      <div className={styles.content}>
        <form>
          <input type="text" placeholder='Ex: https://system.intranet.bb.com.br/rest-of-url' value={url} onChange={event => { setUrl( event.target.value ) }} />
          <div>
            <label>
              <input type="text" placeholder='Ex: cacd93256a06a32001c467ed29734e946a9b8' value={hash} onChange={event => { setHash( event.target.value ) }} />
              <button className={styles.clearButton} onClick={() => handleClearHash()} type='button'>Clear</button>
            </label>
            <label>
              <input type="text" placeholder='Ex: ed29734e946a9b8' value={task} onChange={event => setTask( event.target.value )} />
              <button className={styles.clearButton} onClick={() => handleClearTask()} type='button'>Clear</button>
            </label>
          </div>
          <div className={styles.confirmButton}>
            <button className={styles.actionButton} onClick={() => handleCreatePath()} type='button'>Add</button>
          </div>
        </form>
        <section>
          <button className={styles.clearButton} onClick={() => handleClearList()} type='button'>Clear</button>
          <button className={styles.actionButton} onClick={() => handleCopyToClipBoard()} type='button'>Copy all</button>
        </section>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>URL</th>
              <th>Task</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {finalUrl.map( ( { id, url, task, typeFile, isCopied }: IFinalUrl ) => (
              <tr key={id}>
                <td>{typeFile}</td>
                <td><input type="text" value={url} onChange={() => { }} /></td>
                <td>{task}</td>
                <td>
                  <button className={isCopied ? styles.copiedConfirmed : styles.actionButton} onClick={() => [navigator.clipboard.writeText( url ), setWithCopied( id )]}>Copy Url</button>
                  <button className={styles.actionButton} onClick={() => { navigator.clipboard.writeText( task ) }}>Copy Task</button>
                </td>
              </tr>
            ) )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// https://fontes.intranet.bb.com.br/ath/ath-qmassa-qrobo-api/ath-qmassa-qrobo-api/-/blob/f37cacd93256a06a32001c467ed29734e946a9b8/src/app/controllers/BlockPhoneNumber.controller.ts
// cacd93256a06a32001c467ed29734e946a9b8