import {Row, Col} from 'react-bootstrap';
import Xender from './apkList/Xender.apk';
import demo from './apkList/demo.apk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState} from "react";


function App() {

    const [deferredPrompt, setDeferredPrompt] = useState(null);

    function handleDownload() {
        fetch(Xender)
            .then(response => response.blob())
            .then(blob => {
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = 'myapp.apk';
                document.body.appendChild(a);
                const event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(event);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', event => {
            console.log('beforeinstallprompt event triggered');
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            event.preventDefault();
            // Store the event for later use
            setDeferredPrompt(event);
            if (event) {
                handleInstall();
            }
        });
    }, [window,]);

    const handleInstall = () => {
        // Trigger the install prompt
        if (deferredPrompt) {
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then(choiceResult => {
                console.log(choiceResult.outcome);
                // Clear the deferredPrompt variable
                setDeferredPrompt(null);
            });
        }
    };


    return (
        <div className="container d-flex flex-column mt-5">
            <p className='fw-bold text-secondary'>All aplication list</p>
            <div className="container">
                <Row>
                    {[...Array(10)].map((_, i) => <Col md={4} lg={4} xxl={4} sm={4}
                                                       className="d-flex flex-column app-card p-3"
                                                       onClick={() => handleDownload('https://play.google.com/store/apps/details?id=com.playappking.busrush')}>
                        <img
                            className='rounded shadow'
                            src='https://play-lh.googleusercontent.com/_Ub7v4j6_rVA26PX7KkAwCLaF6nfsrpwMfh1mfhukwp6FLNrc6vHqwn1CwffBR7PUuc=w416-h235-rw'
                            alt=''/>
                        <div className='mt-3 d-flex gap-3'>
                            <img
                                className='rounded shadow'
                                src='https://play-lh.googleusercontent.com/_dDFSU1PlfewLJHAeY8dd4xjUV5-7oBmCRZdLyIh-DV4q71NaeQsf8bNSv8S95lmCPs=s64-rw'
                                alt=''/>
                            <div>
                                <p className='m-0'><strong>Mobile Bank : Balance Checker</strong></p>
                                <p className='m-0'><small>Soul Celestia Solutions</small></p>
                            </div>
                        </div>
                    </Col>)}
                </Row>
            </div>
        </div>
    );
}

export default App;
