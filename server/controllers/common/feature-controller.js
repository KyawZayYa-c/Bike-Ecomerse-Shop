const Feature = require('../../models/Feature');

const addFeatureImages= async (req, res) => {
    try{
        const {image} = req.body;

        const featureImages = new Feature({
            image
        });

        await featureImages.save();

        res.status(201).json({
            success: true,
            data : featureImages
        })

    }catch (err){
        console.log(err);
        res.status(401).json({
            success: false,
            message :"Seme error occured!"
        })
    }
}

const getFeatureImages= async (req, res) => {
    try{
        const images = await Feature.find({});
        res.status(200).json({
            success : true,
            data : images,
        })
    }catch (err){
        console.log(err);
        res.status(400).json({
            success: false,
            message :"Seme error occured!"
        })
    }
}

module.exports = {
    addFeatureImages,
    getFeatureImages,
}