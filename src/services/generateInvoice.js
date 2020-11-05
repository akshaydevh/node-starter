'use strict'
import { bookings } from '../../model/bookings'
import { logger } from '../utils/logger';


export const generateInvoice = async (req, res) => {
    try {
        const { bookingId } = req.body
        const result = await bookings.findOneAndUpdate({ _id: bookingId }, { status: 'payment' }, { new: true });
        if (result) {
            return res.status(200).send(result)
        }
        return res.status(400).send('something went wrong')
    } catch (error) {
        logger.error(error);
        return res.status(400).send('something went wrong')
    }


}