const registrationFunction = (req, res)=>{
  console.log(req.body)
  res.send({massage:"Done"})
}

export {registrationFunction}