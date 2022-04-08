import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
const Loading = () => {

    return (
        <div className="App bg-gray_100">
            <header className="App-header bg-gray_100">
                <div>
                    <p>Loading...</p> <CircularProgress />
                </div>
            </header>
        </div>
    )
}

export default Loading