'use strict'
import { services } from '../../../model/services'
import { logger } from '../../utils/logger';

export const addServices = async (req, res) => {
  try {
    let { label, details, price, description } = req.body;
    await services.create({ "name": label, details, description, "cost": price });
    res.status(200).send('successfully added')
  } catch (error) {
    logger.error(error)
    return res.status(400).send('something went wrong')
  }
}

export const getServices = async (req, res) => {
  try {
    const availableServices = await services.find();
    if (availableServices) {
      return res.status(200).send(availableServices);
    }
    return res.status(400).send('operation failed')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong')
  }

}