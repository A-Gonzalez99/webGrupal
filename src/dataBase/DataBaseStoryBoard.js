
var db = [
    {
        tittle: 'Hotel builds',
        imag: 'StoryBoardsImgs/Image-0.png'
    },
    {
        tittle: 'Zoom into the door / keyhole',
        imag: 'StoryBoardsImgs/Image-1.png'
    },
    {
        tittle: '',
        imag: 'StoryBoardsImgs/Image-2.png'
    },
    {
        tittle: 'Zoom in through the keyhole',
        imag: 'StoryBoardsImgs/Image-3.png'
    },
    {
        tittle: '-New aspect ratio-',
        imag: 'StoryBoardsImgs/Image-4.png'
    },
    {
        tittle: 'Mist / background from the movie',
        imag: 'StoryBoardsImgs/Image-5.png'
    },
    {
        tittle: 'Zoom in through the window',
        imag: 'StoryBoardsImgs/Image-6.png'
    },
    {
        tittle: 'Scenery video from the movie',
        imag: 'StoryBoardsImgs/Image-7.png'
    },
    {
        tittle: 'Elements move in to build the scene',
        imag: 'StoryBoardsImgs/Image-8.png'
    },
]

export function GetDataBaseStoryBoard() {
    return db
}

export function UpdateDataBaseStoryBoard(index, text) {
    db[index].tittle=text
}

export function PostDataBaseStoryBoard(titulo){
    const newStoryboard2 = {
        tittle: titulo,
        imag: "default-image.webp"
    };
    db.push(newStoryboard2)
}

export function RemoveDatabaseStoryBoard(index){
    db.splice(index,index)
}

