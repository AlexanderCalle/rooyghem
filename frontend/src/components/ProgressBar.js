import React from 'react';
import '../style/progressbar.css'

const ProgressBar = ({ filename, progress }) => {
    return (
        <div className="containerBar">
            <div>
                <div className="subContainer">
                    <div className="top">
                        <div>
                            <span className="filenames">
                                {filename}
                            </span>
                        </div>
                        <div className="procentage">
                            <span >
                                {progress > 0 && progress + '%'}
                            </span>
                            <a>
                                <svg fill="none" stroke="#F59E0B" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div className="bar">
                        <div style={{ width: progress + '%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar