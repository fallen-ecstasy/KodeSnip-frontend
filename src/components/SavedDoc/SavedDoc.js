import React, {useState, useEffect} from 'react'

// codemirror
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript"
import { cpp } from '@codemirror/lang-cpp'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { java } from '@codemirror/lang-java'
import { php } from '@codemirror/lang-php'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { xml } from '@codemirror/lang-xml'

// to get document using id
import { useParams } from 'react-router-dom';

// css file
import './SavedDoc.css'

// navbar
import Navbar from '../Header/Navbar'

// frontend api call
import { getSavedDocument } from '../../services/api';

const SavedDoc = () => {

    const { id } = useParams()

    // getting screen height to set height of the editor
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)


    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    // setting code after getting from backend
    // initially set to null
    const [code, setCode] = useState(null)

    // fetching data from backend
    useEffect(() => {
        const fetchData = async () => {
          try {
            const documentData = await getSavedDocument(id);
            setCode(documentData);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, [id]);


    // timing functionality to change text if no document is found
    const [loadingText, setLoadingText] = useState('Loading...')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoadingText('No Document Found!')
        }, 2500)

        return () => clearTimeout(timeout)
    }, [])

    
    if(!code) {
        return <h1 className='saved-doc-loading-page'>{loadingText}</h1>
    }

    return (
        <>
            {/* navbar component */}
            <Navbar />

            <form >

                {/* editor component */}
                <CodeMirror
                    value={code.value} // dynamically saving value that is fetched from database
                    height={`${screenHeight}px`}
                    theme='dark'
                    extensions={[ // supporint different languages
                        javascript({jsx: true}),
                        cpp(),
                        css(),
                        html(),
                        java(),
                        php(),
                        python(),
                        rust(),
                        sql(),
                        xml()
                    ]}
                />

            </form>

        </>
    )

}

export default SavedDoc