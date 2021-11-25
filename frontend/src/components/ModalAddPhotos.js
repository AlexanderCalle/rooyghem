import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ProgressRing from './CircleProgress';
import axios from 'axios';

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
        <div className="fixed z-20 inset-0 overflow-y-auto">
            <div className="block items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block rounded-xl text-left overflow-hidden bg-white shadow-xl border-2 border-yellow-500 transform align-middle sm:max-w-md sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="pb-2 sm:pb-4">
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-center items-center h-11 bg-white rounded-t-lg ">
                                <a onClick={() => setShowModal(false)} className="absolute right-2 text-yellow-500 cursor-pointer focus:outline-none">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </a>
                            </div>
                            <div className="mt-4 px-4">
                                <>
                                    {progress > 0 && (
                                        <div>
                                            <ProgressBar
                                                filename={filename}
                                                progress={progress}
                                            />
                                            <div className="mt-4 flex flex-row justify-between">
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
                                        <label className="w-full h-10 flex flex-row items-center space-x-4 px-4 py-6 bg-yellow-100 border border-yellow-500 text-yellow-500 rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-yellow-500 hover:text-yellow-200">
                                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            <span className="text-base leading-normal">{
                                                fileUploading != null ? fileUploading : 'Select File(s)'
                                            }</span>
                                            <input type='file' className="hidden" onChange={handleChange} multiple accept="image/*" />
                                        </label>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {!fileOnSelected && (
                            <>
                                <button type="button" onClick={() => firstGetFileContext()} className="sm:w-28 w-full inline-flex justify-center rounded-lg px-6 py-2 font-medium focus:outline-none sm:ml-3 text-sm">
                                    Add
                                </button>
                                <a type="button" onClick={() => setShowModal(false)} className="mt-3 sm:mt-0 sm:w-28 inline-flex justify-center pt-5 font-medium  focus:outline-none sm:ml-3 text-sm">Cancel</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddPhotos;