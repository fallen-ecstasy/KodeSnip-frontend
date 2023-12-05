import React, { useEffect, useState } from 'react'

import { Table, TableHead, TableBody, TableCell, TableRow, styled, Button } from '@mui/material'

import { Link } from 'react-router-dom'

// frontend api call
import { getAllDocuments, deleteDocument } from '../../services/api'

import {useAuthContext} from '../../hooks/useAuthContext'

// styles for table
const Container = styled(Table)`
    width: 70%;
    margin: 50px auto 0 auto;
`

const THead = styled(TableRow)`
    background: #fff;
    & > th {
        color: #111;
        font-size: 20px;
    }
`

const TBody = styled(TableRow)`
    & > td {
        font-size: 15px
    }
`


// modal alert message
const Alert = ({ message, onClose }) => {
    return (
      <div className="alert">
        <div className="alert-content">
          <div className="alert-message">{message}</div>
          <button className="alert-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
}


const DashboardTable = () => {

    const { user } = useAuthContext()

    // alert message
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // alert message
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    // document state
    const [documents, setDocuments] = useState([])

    // getting all documents 
    useEffect(() => {
        if(user) {
            getAllSavedDocuments(user.token)
        }
    }, [user])

    // getting document and storing them 
    const getAllSavedDocuments = async (token) => {
        try {
            const response = await getAllDocuments(token)
            setDocuments(response)
        } catch (error) {
            console.log(error)
        }
    }

    // function to delete saved document
    const deleteSavedDocument = async (id) => {
        try {
            const authToken = user.token
            const response = await deleteDocument(id, authToken)
            console.log(response)
            // message on success
            if(response.message === 'User Deleted Successfully') {
                setAlertMessage('Document Deleted');
                setShowAlert(true);
            }
            getAllSavedDocuments(authToken)

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Container>
                <TableHead>
                    <THead>
                        <TableCell>Codeshare Link</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Syntax</TableCell>
                        <TableCell>Actions</TableCell>
                    </THead>
                </TableHead>

                {/* showing documents if present in database */}
                {/* else showing message */}
                <TableBody>
                    {documents && documents.length > 0 ? ( // ? operator
                        documents.map((document) => (
                        <TBody key={document._id}>
                            <TableCell>
                                <Link to={`/${document._id}`} style={{ textDecoration: 'none' }}>
                                    {document._id}
                                </Link>
                            </TableCell>
                            <TableCell>{new Date(document.createdAt).toLocaleDateString('en-GB')}</TableCell>
                            <TableCell>{new Date(document.createdAt).toLocaleTimeString()}</TableCell>
                            <TableCell>Plain Text</TableCell>
                            <TableCell>
                            <Button variant='' onClick={() => deleteSavedDocument(document._id)}>
                                Delete
                            </Button>
                            </TableCell>
                        </TBody>
                        ))
                    ) : ( // : operator
                        <TBody>
                        <TableCell colSpan={5}  style={{
                            textAlign: 'center', 
                            fontFamily: 'monospace',
                            fontWeight: 'bolder',
                            fontSize: '20px'
                        }}>
                            No Documents Found
                        </TableCell>
                        </TBody>
                    )}
                    </TableBody>
            </Container>

             {/* modal alert messages */}
            {showAlert && (
                <div className="alert-wrapper">
                <Alert message={alertMessage} onClose={handleCloseAlert} />
                </div>
            )}

        </>
    )
}

export default DashboardTable