'use strict'
import { bookings } from '../../model/bookings'
import { logger } from '../utils/logger';

export const getPaymentList = async (req, res) => {
    try {
        const { limit, offset } = req.params;
        const result = await bookings.aggregate([
            {
                $match: { status: 'payment' }

            },
            {
                $skip: parseInt(offset)
            },
            {
                $limit: parseInt(limit)
            },

            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userData"
                }
            },
            {
                $unwind: '$userData'
            },
            {
                $lookup: {
                    from: "availableservices",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "serviceData"
                }
            },
            {
                $unwind: '$serviceData'
            },
            {
                $project: {
                    bookingId: '$_id',
                    status: 1,
                    paymentStatus: 1,
                    scheduledDate: 1,
                    availableDates: 1,
                    generatedInvoice: 1,
                    address: 1,
                    userId: 1,
                    cost: '$serviceData.cost',
                    serviceId: 1,
                    registeredDate: '$date',
                    numberOfDealings: '$userData.numberOfDealings'
                }
            }
        ])
        return res.status(200).send(result)
    } catch (error) {
        logger.error(error);
        return res.status(400).send('something went wrong');
    }

}