const inputChanger = (event , updatedValue)=>{
  const newValue = event.target.value
  updatedValue(newValue);

}

export default inputChanger;