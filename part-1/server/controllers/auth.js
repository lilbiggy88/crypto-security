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
          break;
        }

      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const { username, email, firstName, lastName, password} = res.data
      const hash = bcrypt.hashSync(password, 10)
      const user = { 
        username,
        email,
        firstName,
        lastName,
        password: hash,
      }

        users.push(user)
        res.status(200).send(user)
    }
}