const photographerName = document.getElementsByClassName("photographer-name")
const photographerLink = document.getElementsByClassName("photographer")
const photoLibraryName = document.getElementsByClassName("photo-library-name")
const photoLibraryLink = document.getElementsByClassName("photo")


const btnPrevious = document.getElementById("btn-previous")
const btnNext = document.getElementById("btn-next")
const closeMessage = document.getElementById('close-nav')

let photoCollection = [
    {
        photoName: "Eiffel Tower",
        photographerName: "Stijn te Strake",
        photographerLink:"https://unsplash.com/@stijntestrake?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        photoLibraryName: "Unsplash",
        photoLibraryLink: "https://unsplash.com/s/photos/eiffel-tower?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        imageSrc: "images/stijn-te-strake-m45uW4f9YQg-unsplash.jpg",
        imageAlt: "startled pigeons rising in front of the Eiffel Tower"
    },

    {
        photoName: "Big Ben",
        photographerName: "Jure Tufekcic",
        photographerLink:"https://unsplash.com/@tufo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        photoLibraryName: "Unsplash",
        photoLibraryLink: "https://unsplash.com/s/photos/big-ben?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        imageSrc: "images/jure-tufekcic-3zWTu2AgyoE-unsplash.jpg",
        imageAlt: "clock face and architectural detail of Big Ben"

    },
    
    {
        photoName: "Statue of Liberty",
        photographerName: "Julius Drost",
        photographerLink:"https://unsplash.com/@juliusdrost?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        photoLibraryName: "Unsplash",
        photoLibraryLink: "https://unsplash.com/s/photos/statue-of-liberty?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        imageSrc: "images/julius-drost-sf8b4ucpdkg-unsplash.jpg",
        imageAlt: "dramatic clouds provide a backdrop for the Statue of Liberty"
    },

    {
        photoName: "Sydney Opera House",
        photographerName: "Kate Trifo",
        photographerLink:"https://unsplash.com/@katetrifo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        photoLibraryName: "Unsplash",
        photoLibraryLink: "https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
        imageSrc: "images/kate-trifo-et0Ufb4DDRA-unsplash.jpg",
        imageAlt: "close-up of the sails of the Sydney Opera House, by night"
    }
]


function createPhotoDisplay(){

    let index = 0
    const carouselImage = document.querySelector(".carousel-image") 
    const carouselActions = document.querySelector(".carousel-actions")

    for (photo of photoCollection){
       // DISPLAY THE IMAGES  
       const pic = document.createElement("img")
       pic.classList.add("image")
       if(index === 0){pic.classList.add("image-visible")}
       pic.setAttribute("data-index", index)
       pic.onclick = () => { start = !start }
       pic.addEventListener("click", changePhoto)
       pic.src = photoCollection[index].imageSrc
       pic.alt= photoCollection[index].imageAlt
       carouselImage.insertBefore(pic, carouselActions)

        //CREATE THE CIRCLE DISPLAY

        const circle = document.createElement("button")
        circle.classList.add("btn-display")
        if(index === 0){circle.classList.add("btn-visible")}
        circle.setAttribute("aria-label", `image ${index + 1}`)
        circle.setAttribute("data-index", index)
        circle.onclick = () => { start = false} // If running, stops the photos changing automatically
        circle.addEventListener("click", selectPhoto)
        carouselActions.insertBefore(circle, btnNext)

       // DISPLAY THE DESCRIPTIONS 
       // create div
       const carouselDescriptionDiv = document.createElement("div")
       carouselDescriptionDiv.classList.add("carousel-description")
       if (index === 0) carouselDescriptionDiv.classList.add("description-visible")
       carouselDescriptionDiv.setAttribute("data-index", index)

       // create and append the <h2> and <p> for the description 
       const currentPhoto = photoCollection[index]

       const photoName = document.createElement("h2") 
        photoName.textContent = currentPhoto.photoName 
        carouselDescriptionDiv.append(photoName)

        const photoParagraph = document.createElement("p")
        photoParagraph.innerHTML = `Photo by <a class ="photographer" href="${currentPhoto.photographerLink}">${currentPhoto.photographerName}</a>
        <br>
        on <a class="photo" href="${currentPhoto.photoLibraryLink}">${currentPhoto.photoLibraryName}</a>`
        

        carouselDescriptionDiv.append(photoParagraph)

       // append the .card with the carouselDescriptionDiv
       const card = document.querySelector(".card")
       card.append(carouselDescriptionDiv)


        //INCREASE THE INDEX
       index++
    }

}

createPhotoDisplay()

// If running, stop the photos changing automatically when the left and right arrow are clicked     
btnNext.onclick = () => { start = false }
btnPrevious.onclick = () => { start = false }


let photoCollectionIndex = 0
let photoCollectionLength = photoCollection.length
const btnDisplay = document.getElementsByClassName("btn-display")
const image = document.getElementsByClassName("image")
const carouselDescription = document.getElementsByClassName("carousel-description")


function clearPhoto(){
    // image
    for (const im of image){
        im.classList.remove("image-visible")
    }
    
    // button display
    for (const circle of btnDisplay){
        circle.classList.remove("btn-visible")
    }

    // description
    for (const div of carouselDescription){
        div.classList.remove("description-visible")
    }
}


function getPhoto(){
    // image
    image[photoCollectionIndex].classList.add("image-visible")
    
    // button display
    btnDisplay[photoCollectionIndex].classList.add("btn-visible")

    // description
    carouselDescription[photoCollectionIndex].classList.add("description-visible")
}

function nextPhoto(){
    clearPhoto()

    if(photoCollectionIndex === photoCollectionLength - 1){
        photoCollectionIndex = 0
    }else{
        photoCollectionIndex++
    }

    getPhoto()
}


btnNext.addEventListener("click", nextPhoto)

function prevPhoto(){
    clearPhoto()

    if(photoCollectionIndex === 0){
        photoCollectionIndex = photoCollectionLength - 1  
    }else{
        photoCollectionIndex--
    }
    getPhoto()
}

btnPrevious.addEventListener("click", prevPhoto)


function selectPhoto(evt){
    //clear current photo and description
    clearPhoto()
    //make photoCollectionIndex equal the index of the button in the btnDisplay
   photoCollectionIndex = parseInt(evt.target.dataset.index)
    //get photo and description
    getPhoto()

}

let start = false 
const timerId = setInterval(changePhoto, 4000)


function changePhoto(){
    
    if(start){
    nextPhoto()
    }else{
        stopChangePhoto
    }
}


function stopChangePhoto() {
    clearInterval(timerId)
}



closeMessage.addEventListener('click', function (){
    document.querySelector(".autoplay-message").style.display = "none"
})


setTimeout(function(){
    document.querySelector(".autoplay-message").style.display = "none"
}, 5000)
