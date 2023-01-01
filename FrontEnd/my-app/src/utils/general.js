const inputChanger = (event , updatedValue)=>{
  const newValue = event.target.value
  updatedValue(newValue);

}

const imageChanger = (event, updateImage)=>{
  const newValue = event.target.files[0]
  updateImage(newValue)
}

export  {inputChanger, imageChanger};