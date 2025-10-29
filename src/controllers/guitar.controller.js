const Guitar = require('../models/Guitar');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.getAllGuitars = async (req, res) => {
        try {
        const guitars = await Guitar.find({});
        return res.status(200).json({ guitars });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al obtener las guitarras',
            error: error.message
        })
    }
}

exports.createGuitar = async (req, res) => {
    const { name, price, description, img, currency, slug } = req.body;
    try {
        const product = await stripe.products.create({
            name,
            description,
            images: [img],
            metadata: {
                productDescription: description,
                slug
            }
        })

        const stripePrice = await stripe.prices.create({
            unit_amount: price,
            currency,
            product: product.id
        })

        const newGuitar = await Guitar.create({
           idProd: product.id,
           priceID: stripePrice.id,
           name,
           price,
           description,
           img,
           slug,
           currency 
        });

        res.json(newGuitar);
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error creando la guitarra',
            error
        })
    }
}

exports.updateGuitarById = async (req, res) => {
    try {
        const { name, price } = req.body;
        const updatedGuitar = await Guitar.findByIdAndUpdate(
            req.params.id,
            { name, price},
            { new: true, runValidators: true }
        );
        if (!updatedGuitar) return res.status(404).json({ message: 'Guitarra no encontrada' });
        return res.status(200).json({ guitarraActualizada: updatedGuitar });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error actualizando la guitarra',
            error: error.message
        })
    }
}

exports.deleteGuitarById = async (req, res) => {
    try {
        const deletedGuitar = await Guitar.findByIdAndDelete(req.params.id);
        if (!deletedGuitar) return res.status(404).json({ message: 'Guitarra no encontrada' });
        return res.status(200).json({ message: 'La guitarra se elimino correctamente' });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error eliminando la guitarra',
            error: error.message
        })
    }
}