'use strict'
import { users } from '../../../model/user'
import { logger } from '../../utils/logger';

export const addUser = async (req, res) => {
  try {
    let { username, firstName, lastName, city, address } = req.body;
    await users.create({ username, firstName, lastName, city, address });
    res.status(200).send('user added successfully')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong')
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const userList = await users.find();
    if (userList) {
      return res.status(200).send(userList);
    }
    return res.status(400).send('something went wrong')
  } catch (error) {
    logger.error(error);
    return res.status(400).send('something went wrong')
  }
}  