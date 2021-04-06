import { uid } from 'uid';

export const formatCreateData = (params) => {
  return {
    title: params.title,
    bookingDate: new Date(params.bookingDate).getTime() / 1000, // format 2012.08.10
    customer: { ...params.customer },
    address: { ...params.address },
    uid: uid(20)
  }
}

export const formatUpdateData = (params) => {
  return {
    title: params.title,
    bookingDate: new Date(params.bookingDate).getTime() / 1000
  }
}
