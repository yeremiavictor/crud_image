import React, {useState, useEffect} from "react"
import axios from 'axios'
import {useParams, useNavigate} from "react-router-dom"

const Editproduct = () => {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:/products.${id}`)
        setTitle(response.data.name)
        setFile(response.data.image)
        setPreview(response.data.url)
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        formData.append("title", title)
        try{
            await axios.patch(`http://lovalhost:/products/${id}`, formData,{
                headers:{
                    "Content-type": "multipart/form-data"
                },
            })
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="columns is-centered mt-5">
            <div className="columns is-half">
                <form onSubmit={updateProduct}>
                    <div className="field">
                        <label className="label">Product Name</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Product Name"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input 
                                        type="file"
                                        className="file-input"
                                        onChange={loadImage}
                                    />
                                    <span className="file-cta">
                                        <span className="file-label">Choose a file...</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className="image is-128x128">
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ):(
                        ""
                    )}

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">Update</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Editproduct