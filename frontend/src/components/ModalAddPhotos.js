import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ProgressRing from './CircleProgress';
import axios from 'axios';
import '../style/modalAddPhotos.css'

let chunkSize = 1024 * 1024;

const ModalAddPhotos = (props) => {

    const { album, showModal, setShowModal } = props;

    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState(null);
    const [fileUploading, setFileUploading] = useState(null);
    const [counter, setCounter] = useState(1);
    const [fileToBeUpload, setFileToBeUpload] = useState({});
    const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
    const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
    const [fileSize, setFileSize] = useState(0)
    const [chunkCount, setChunkCount] = useState(0);
    const [filename, setFilename] = useState("");
    const [fileOnSelected, setFileOnSelected] = useState(0);
    const [fullFileName, setFullFileName] = useState("");

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    function handleChange(event) {
        if (event.target.files.length > 1) {
            setFileUploading(`${event.target.files.length} selected`);
            setFiles(event.target.files);
        } else {
            setFileUploading(event.target.files[0].name);
            setFiles(event.target.files);
        }
    }

    const firstGetFileContext = () => {
        resetChunkProperties();
        setCounter(1);

        let numb = fileOnSelected;

        if (files[numb].size > 104857600) {
            chunkSize = 10 * 1024 * 1024;
        }

        const tempFileName = Date.now() + files[numb].name.replace(/\s/g, '');

        setFullFileName(tempFileName);

        axios.get(`http://localhost:2000/albums/pic/openStream/${album.name + album.album_id}/${tempFileName}`, {
            cancelToken: source.token
        })
            .then(async response => {
                if (response.status === 200) {
                    setFileSize(files[numb].size);
                    const _totalCount = files[numb].size % chunkSize == 0 ? files[numb].size / chunkSize : Math.floor(files[numb].size / chunkSize) + 1;
                    setChunkCount(_totalCount);
                    setFileToBeUpload(files[numb]);
                    setFilename(files[numb].name);
                }
            });
    }

    const getFileContext = () => {
        resetChunkProperties();
        setCounter(1);

        let numb = fileOnSelected + 1;

        if (files[numb].size > 104857600) {
            chunkSize = 10 * 1024 * 1024;
        }

        const tempFileName = Date.now() + files[numb].name.replace(/\s/g, '');

        setFullFileName(tempFileName);

        axios.get(`http://localhost:2000/albums/pic/openStream/${album.name + album.album_id}/${tempFileName}`, {
            cancelToken: source.token
        })
            .then(async response => {
                if (response.status === 200) {
                    setFileSize(files[numb].size);

                    const _totalCount = files[numb].size % chunkSize == 0 ? files[numb].size / chunkSize : Math.floor(files[numb].size / chunkSize) + 1;
                    setChunkCount(_totalCount);

                    setFileToBeUpload(files[numb]);
                    setFilename(files[numb].name);

                    setFileOnSelected(fileOnSelected + 1);
                }
            });
    }

    const resetChunkProperties = () => {
        setProgress(0);
        setCounter(1);
        setBeginingOfTheChunk(0);
        setEndOfTheChunk(chunkSize);
        setFileSize(0);
        setChunkCount(0);
        setFileToBeUpload({});
    }

    useEffect(() => {
        if (fileSize > 0) {
            fileUpload(counter);
        }
    }, [fileToBeUpload, progress]);

    const fileUpload = () => {
        setCounter(counter + 1);
        if (counter <= chunkCount) {
            var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
            uploadChunk(chunk)
        }
    }

    const uploadChunk = async (chunk) => {

        try {
            const response = await axios.post(`http://localhost:2000/albums/pic/UploadChunks`, chunk, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                cancelToken: source.token
            });

            const data = response.data;

            if (response.status === 201) {
                let numb = fileOnSelected;
                if (files[numb].size > 104857600) {
                    chunkSize = 10 * 1024 * 1024;
                }

                setBeginingOfTheChunk(endOfTheChunk);
                setEndOfTheChunk(endOfTheChunk + chunkSize);

                if (counter == chunkCount) {
                    console.log('Process is complete, counter', counter)
                    await uploadCompleted();
                } else {
                    var percentage = Math.floor((counter / chunkCount) * 100);
                    setProgress(percentage);
                }
            } else {
                console.log('Error Occurred:', data)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const uploadCompleted = async () => {
        if (files.length > 1) {
            setFileOnSelected(fileOnSelected + 1);
        }

        let numb = 0;

        if (files.length > 1) {
            numb = fileOnSelected;
        }

        const response = await axios.post(`http://localhost:2000/albums/album/${album.album_id}/add`, {
            cancelToken: source.token,
            body: {
                file: fullFileName
            }
        });
        if (response.status === 200) {
            setProgress(100);
            console.log(files.length);
            if (files.length == 1) {
                setTimeout(() => {
                    resetChunkProperties();
                    setShowModal(false);
                    setFileUploading(null);
                    window.location.reload()
                }, 1000);
            } else {
                if (files.length - 1 === fileOnSelected) {
                    setTimeout(() => {
                        resetChunkProperties();
                        setShowModal(false);
                        setFileUploading(null);
                        window.location.reload();
                    }, 1000);
                } else {
                    setTimeout(() => {
                        getFileContext();
                    }, 1000);
                }
            }
        }
    }

    return (
        <div className="containerModal">
            <div className="container">
                <div className="backContainer" aria-hidden="true">
                    <div className="back"></div>
                </div>
                <span className="containerSpan" aria-hidden="true">&#8203;</span>
                <div className="containerAdd" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="paddingAdd">
                        <div className="flexAdd">
                            <div className="topAddSection">
                                <a onClick={() => setShowModal(false)}>
                                    <svg fill="none" stroke="#f98d1e" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </a>
                            </div>
                            <div className="middleAddSection">
                                <>
                                    {progress > 0 && (
                                        <div>
                                            <ProgressBar
                                                filename={filename}
                                                progress={progress}
                                            />
                                            <div className="ring">
                                                <p>Completed: {fileOnSelected}/{files == null ? "0" : files.length}</p>
                                                <ProgressRing
                                                    strokeWidth="3"
                                                    sqSize="25"
                                                    percentage={files == null ? 0 : (fileOnSelected / files.length) * 100}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {progress === 0 && (
                                        <label className="inputSection">
                                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            <span>{
                                                fileUploading != null ? fileUploading : 'Select File(s)'
                                            }</span>
                                            <input id="fileUpload" type='file' hidden="true" onChange={handleChange} multiple accept="image/*" />
                                        </label>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="bottomAddSection">
                        {!fileOnSelected && (
                            <>
                                <button type="button" onClick={() => firstGetFileContext()} className="btnAdd">
                                    Add
                                </button>
                                <a type="button" onClick={() => setShowModal(false)} className="btnCancel">Cancel</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddPhotos;