const addText = document.getElementById('add-text');
const canvas = document.getElementById('canvas');
const layer = document.querySelector('.layer');
const listOneItem = document.querySelectorAll('li');
const ul = document.querySelector('.layer');

let j = 0;

const createInput = () => {
  let i = j++;

  const input = document.createElement('input');
  input.setAttribute("id", `input-create${i}`)
  input.classList.add('style')

  input.style.position = 'absolute';

  canvas.appendChild(input);
  insertText(i);
}

const insertText = (i) => {
  const listItem = document.createElement('li');
  listItem.classList.add('remove')
  const input = document.getElementById(`input-create${i}`);

  if (input) {
    input.addEventListener('keyup', (e) => {
      if(e.key === 'Enter'){
        listItem.innerHTML = input.value;
        layer.append(listItem);
        input.value = '';
        input.classList.add('input-hide');
        saveToLocalStorage(); //save to storage
      }
    });
  }
}

function saveToLocalStorage() {
  const listItems = Array.from(layer.getElementsByTagName('li'));
  const listData = listItems.map(item => item.innerHTML);
  localStorage.setItem('savedList', JSON.stringify(listData));
}

function loadFromLocalStorage() {
  const savedList = localStorage.getItem('savedList');
  if (savedList) {
    const listData = JSON.parse(savedList);
    listData.forEach(itemText => {
      const listItem = document.createElement('li');
      listItem.innerHTML = itemText;
      layer.appendChild(listItem);
    });
  }
}

window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

listOneItem.forEach(item => {
    item.addEventListener('click', () => {
        item.remove();
        saveToLocalStorage();
    })
})



const alignLeft = document.getElementById('align-left');
const alignRight = document.getElementById('align-right');
const alignCenter = document.getElementById('align-center')

alignLeft.addEventListener('click', () => {
  ul.style.justifyContent = 'start'
})

alignRight.addEventListener('click', () => {
  ul.style.justifyContent = 'end'
})

alignCenter.addEventListener('click', () => {
  ul.style.justifyContent = 'center'
})


const headerDropdown = (() => {
  const fileCont = document.getElementById('file-cont');
  const fileTab = document.getElementById('file-tab');
  
  fileCont.addEventListener('click', () => {
    fileTab.classList.toggle('reveal-header')
  })
  
  fileCont.addEventListener('mouseover', () => {
    fileTab.classList.add('reveal-header');
  })
  
  fileCont.addEventListener('mouseleave', () => {
    fileTab.classList.remove('reveal-header')
  })
  
  
  const editCont = document.getElementById('edit-cont');
  const editTab = document.getElementById('edit-tab');
  
  
  editCont.addEventListener('click', () => {
    editTab.classList.toggle('reveal-header')
  })
  
  editCont.addEventListener('mouseover', () => {
    editTab.classList.add('reveal-header')
  })
  
  editCont.addEventListener('mouseleave', () => {
    editTab.classList.remove('reveal-header')
  })
  
  const helpCont = document.getElementById('help-cont');
  const helpTab = document.getElementById('help-tab');
  
  helpCont.addEventListener('click', () => {
    helpTab.classList.toggle('reveal-header')
  })
  
  helpCont.addEventListener('mouseover', () => {
    helpTab.classList.add('reveal-header')
  })
  
  helpCont.addEventListener('mouseleave', () => {
    helpTab.classList.remove('reveal-header')
  })
})();




const newFile = document.getElementById('new');

newFile.addEventListener('click', () => {
  localStorage.removeItem('savedList');
  localStorage.clear();
  location.reload()
})

const fontColor = document.getElementById('font-color');

fontColor.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    const fontColorValue = fontColor.value;
    ul.style.color = fontColorValue;
  }
})

fontColor.addEventListener('change' , ()=>{

})

const fontFamilyInput = document.getElementById('font-family');

fontFamilyInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
      const fontFamily = fontFamilyInput.value;
      if(fontFamily === 'poppins'){
        ul.style.fontFamily = 'poppins'
      }else if(fontFamily === 'orbitron'){
        ul.style.fontFamily = 'orbitron'
      }else{
        ul.style.fontFamily = `${fontFamily}`
      }
    }
})

const fontInput = document.getElementById('font-size');


fontInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        const fontSize = fontInput.value;
        ul.style.fontSize = `${fontSize}px`;
    }
});


const fontWeightInput = document.getElementById('font-weight');

fontWeightInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        const fontWeight = fontWeightInput.value;
        ul.style.fontWeight = `${fontWeight}`;
    }
})

// color picker
const getColorValue = document.getElementById("color-picker");

getColorValue.addEventListener('change', ()=>{
  fontColor.value = getColorValue.value;
  ul.style.color = `${getColorValue.value}`
})


const imagePicker = document.getElementById('image-picker');
const imageCanvas = document.getElementById('image-canvas');


window.addEventListener('load', function () {
  imagePicker.addEventListener('change', function () {
    if (this.files&&this.files[0]) {
      imageCanvas.onload = () => {
        URL.revokeObjectURL(imageCanvas.src);
      }
      imageCanvas.src = URL.createObjectURL(this.files[0]);
    }
    imageCanvas.style.display = "block"
  });
});


const brightnessControl = document.getElementById('Brightness')
const contrastControl = document.getElementById('Contrast');
const grayControl = document.getElementById('gray');
const blurControl = document.getElementById('blur');

const changePicAttr = (() => {
  brightnessControl.addEventListener('change', () => {
    let brightnessValue = brightnessControl.value ;
    imageCanvas.style.filter = `brightness(${brightnessValue}%)`
  })
  contrastControl.addEventListener('change', () => {
    let contrastValue = contrastControl.value ;
    imageCanvas.style.filter = `contrast(${contrastValue}%)`
  })
  grayControl.addEventListener('change', () => {
    let grayValue = grayControl.value ;
    imageCanvas.style.filter = `grayscale(${grayValue}%)`
  })
  blurControl.addEventListener('change', () => {
    let blurValue = blurControl.value;
    imageCanvas.style.filter = `blur(${blurValue}px)`
  })
})();

const asidePanel = document.querySelector('.aside');


imagePicker.addEventListener('change', () => {
  asidePanel.style.opacity = '1'
})