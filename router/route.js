'use strict';
import { addServices, getServices } from '../src/services/general/services';
import { getAllUsers, addUser } from '../src/services/general/user'
import { newBooking, listBooking, acceptBooking, getActiveBookings } from '../src/services/bookings'
import { getPaymentList } from '../src/services/payment';
import { generateInvoice } from '../src/services/generateInvoice';
import { logger } from '../src/utils/logger';

export default (app) => {
    try {
        app.route('/addNewService')
            .post(addServices);

        app.route('/getAllServices')
            .get(getServices);

        app.route('/getAllUsers')
            .get(getAllUsers);

        app.route('/addNewUser')
            .post(addUser);

        app.route('/addNewBooking')
            .post(newBooking);

        app.route('/listBookings/:serviceID/:limit/:offset')
            .get(listBooking);

        app.route('/acceptBooking')
            .put(acceptBooking);

        app.route('/getActiveBookings/:limit/:offset')
            .get(getActiveBookings);

        app.route('/generateInvoice')
            .put(generateInvoice);

        app.route('/getPaymentList/:limit/:offset')
            .get(getPaymentList);

    } catch (error) {
        logger.error(error)
    }

}