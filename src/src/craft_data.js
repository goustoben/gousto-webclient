// const nodeList = document.querySelectorAll('.wilf-item')

// const allItems = []

// nodeList.forEach((node) => {
//   console.log(node.querySelector('.item-title').innerHTML)
//   if (node.querySelector('.collection-item__image')) {
//     allItems.push(
//     {
//       name: node.querySelector('.item-title').innerHTML,
//       src: node.querySelector('.collection-item__image').getAttribute('src'),
//       url: node.querySelector('.collection-item__image').getAttribute('src'),
//     }
//   )

//   }


// })


const nodeList = document.querySelectorAll('.discovery-gins')

const allItems = []

nodeList.forEach((node) => {
  console.log(node.querySelector('h2 div').innerHTML)
  if (node.querySelector('.discovery-gin__image')) {
    allItems.push(
      {
        name: node.querySelector('h2 div').innerHTML,
        src: node.querySelector('.discovery-gin__image').getAttribute('src'),
        url: node.querySelector('.discovery-gin__image').getAttribute('src'),
      }
    )

  }
})




// const nodeList = document.querySelectorAll('.seasonal-blurb')

// const allItems = []

// nodeList.forEach((node) => {
//   console.log(node.querySelector('h3').innerHTML)
//   if (node.querySelector('.seasonal-cta')) {
//     allItems.push(
//     {
//       name: node.querySelector('h3').innerHTML,
//       src: node.querySelector('.seasonal-cta').getAttribute('src'),
//       url: node.querySelector('.seasonal-cta').getAttribute('src'),
//     }
//   )

//   }


// })
