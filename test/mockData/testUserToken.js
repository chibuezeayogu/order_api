import { adminFirebase } from '../../src/config/db'
// import firebasemock from 'firebase-mock'



console.log("==============================")
const token = () => {
  return adminFirebase
    .auth()
    .getUser("5iEm1HvIxubLaiKO4yj0Npmvq0F2")
    .then(user => {
      console.log("==========================in then")
      console.log(user)
    })
    .catch(error => {
      console.log(error)
    })
  
  //   console.log({ user })
  // const token = await user.getIdToken()
  // console.log({ token })
  // return token
}
console.log("==============================0000000")


export default token