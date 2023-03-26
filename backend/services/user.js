import User from "../models/user.js"

export async function getUser(options) {
  return await User.findOne(options) 
}

export async function createUser(options) {
  return await User.create(options) 
}