const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const isMatchingPw = bcrypt.compareSync(password, users[i].password)
          if(isMatchingPw){
            const sanitizedUser = { ...users[i] }
            delete sanitizedUser.password
            return res.status(200).send(sanitizedUser)
          }
          break
          //check password
          //if matches, send, else, don't
          //res.status(200).send(users[i])
        }

      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { password } = req.body
      //const { username, email, firstName, lastName, password} = res.data
      const hash = bcrypt.hashSync(password, 10)
      // const user = { username,
      //   email,
      //   firstName,
      //   lastName,
      //   password: hash,
      // }
      const user = {
        ...req.body, 
        password: hash
      }
      console.log('Registering User')
        console.log(req.body)
        users.push(user)
        res.status(200).send(user)
    }
}