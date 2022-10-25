import axios from 'axios';
import React, { useEffect, useState } from 'react'

function FileUploadExample() {
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);


    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };


    const uploadToServer = async (event) => {
        const body = new FormData();
        body.append("file", image);
        const response = await axios.post("https://us-central1-hibritardpro.cloudfunctions.net/api/uploadProfile/vpvR06hkEJHR0LbSNiA8", body, {
            headers: {
                'Authorization': localStorage.getItem("GZIToken")
            }
        });
    };


    return (
        <div>
            <img src={createObjectURL} width="200" />
            <h4>Select Image</h4>
            <input type="file" name="myImage" onChange={uploadToClient} />
            <button
                className="btn btn-primary"
                type="submit"
                onClick={uploadToServer}
            >
                Send to server
            </button>
        </div>
    )
}

export default FileUploadExample