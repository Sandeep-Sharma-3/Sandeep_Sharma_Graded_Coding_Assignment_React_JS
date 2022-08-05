import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Home = () => {
    return (
        <main>
            <section className='my-5'>
                <header>
                    <h1>
                        <FontAwesomeIcon icon={faVideoCamera} className="me-2"/>
                        Movie Bar
                    </h1>
                </header>
                <hr/>
                <div>
                    Welcome to Movie Bar. You can find your favourite movies and check them out.
                    <div className="my-3">
                        <small>
                            <strong>NOTE</strong>: You can even add movies to your favorites list.
                        </small>    
                    </div> 
                </div>
            </section>
        </main>
    )
};

export default Home;