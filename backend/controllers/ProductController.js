import Product from "../models/ProductModel.js"
import path from "path";
import fs from "fs";

export const getProducts = async(req, res)=>{
    try{
        const response = await Product.findAll()
        res.json(response)
    }catch(e){
        console.log(e.message)
    }
}

export const saveProduct = (req,res)=>{
    if(req.files === null) return res.status(400).json({msg:"No File Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5+ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"})
    if(fileSize > 5000000) return res.status(442).json({msg: "Image must be less than 5MB"})

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})
        try{
            await Product.create({name:name, image:fileName, url:url})
            res.status(201).json({msg: "Product created successfully"})
        } catch (err) {
            console.log(err.message)
        }
    })

}
