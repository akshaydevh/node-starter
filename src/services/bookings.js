'use strict'
import { bookings } from '../../model/bookings'
import { users, castUserId } from '../../model/user'
import { logger } from '../utils/logger';


export const newBooking = async (req, res) => {
  try {
    const { serviceId, userId, availableDates, bookedAddress } = req.body;
    const userObjectId = castUserId(userId);
    const serviceObjectId = castUserId(serviceId)
    await bookings.create({ "serviceId": serviceObjectId, "userId": userObjectId, availableDates, bookedAddress });
    await users.findOneAndUpdate({ '_id': userObjectId }, { $inc: { 'numberOfDealings': 1 } })
    return res.status(200).send('booking successfull')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong')
  }
}

export const listBooking = async (req, res) => {
  try {
    const { serviceID, limit, offset } = req.params
    const userList = await bookings.aggregate([
      {
        $match: {
          serviceId: castUserId(serviceID),
          status: 'pending'
        },

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
        $project: {
          bookingId: '$_id',
          status: 1,
          paymentStatus: 1,
          scheduledDate: 1,
          availableDates: 1,
          generatedInvoice: 1,
          address: 1,
          userId: 1,
          serviceId: 1,
          registeredDate: '$date',
          numberOfDealings: '$userData.numberOfDealings'
        }
      }
    ])
    if (userList) {
      return res.status(200).send(userList);
    }
    return res.status(400).send('something went wrong')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong');
  }

}

export const getActiveBookings = async (req, res) => {
  try {
    const { limit, offset } = req.params
    const userList = await bookings.aggregate([
      {
        $match: { status: 'active' }

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
        $project: {
          bookingId: '$_id',
          status: 1,
          paymentStatus: 1,
          scheduledDate: 1,
          availableDates: 1,
          generatedInvoice: 1,
          address: 1,
          userId: 1,
          serviceId: 1,
          registeredDate: '$date',
          numberOfDealings: '$userData.numberOfDealings'
        }
      }
    ])
    if (userList) {
      return res.status(200).send(userList);
    }
    return res.status(400).send('something went wrong')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong')
  }

}

export const acceptBooking = async (req, res) => {
  try {
    const { scheduledDate, bookingId } = req.body;
    const details = await bookings.findOneAndUpdate({ _id: castUserId(bookingId) }, { status: "active", scheduledDate }, { new: true });
    if (details) {
      return res.status(200).send(details)
    }
    return res.status(400).send('something went wrong')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong')
  }

}