'use strict'
let axios = require('axios')

module.exports.getUsers = async function getUsers(req, res, next) {
  let userList = [];
  let memberRequest = await axios.get("https://api.github.com/orgs/governify/members");
  let members = memberRequest.data
  await Promise.all(members.map(async (member)=>{
    let user = {
        name: member.login,
        avatar: member.avatar_url,
        repositories : []
      };
      let reposRequest = await axios.get('https://api.github.com/users/'+ member.login +'/repos').catch(err=>{
        console.error('Error when requesting user:' , member.login)
      });
      reposRequest.data.forEach(repo =>{
        user.repositories.push({
          name: repo.name,
          commits: repo.size
        })
      })
      userList.push(user)
  }))
console.log(members)
  res.send(userList);
};

module.exports.addUser = function addUser(req, res, next) {
  res.send({
    message: 'This is the mockup controller for addUser'
  });
};