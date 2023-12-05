import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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


// navbar
import Navbar from '../Header/Navbar'


// api call
import {saveNewCode} from '../../services/api'

import { useAuthContext } from '../../hooks/useAuthContext';


// default value for code
const defaultValue = {
    codeValue: ''
}


const NewDoc = () => {

    const {user} = useAuthContext()

    // getting screen height to set height of the editor
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const [code, setCode] = useState(defaultValue);


    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    // navigating 
    const navigate = useNavigate()


    // onchange value function for editor
    const onChangeValue = React.useCallback((value, viewUpdate) => {
        setCode({ ...code, codeValue: value });
        console.log(value)
    }, [code])


    // handling submitting of document to database
    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const authToken = user.token
            const response = await saveNewCode(code, authToken)
            console.log(response)
            setCode(defaultValue)
            navigate(`/${response._id}`) // opening document after saving

        } catch (error) {
            
            console.log(error.message)

        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} >

                {/* navbar component */}
                <Navbar />

                {/* editor component */}
                <CodeMirror
                    value={code.codeValue}
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
                    onChange={onChangeValue}
                    
                />

            </form>

        </>
    )
}

export default NewDoc