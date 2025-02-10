
const db = [
    {
        name: 'Presentation',
        color: "#2E12E2",
        start:0,
        end:15,
        page:"/scenes"
    },
    {
        name: 'Development',
        color: "#00FF2F",
        start:15,
        end:45,
        page:"/scenes"
    },
    {
        name: 'climax',
        color: "#F75931",
        start:45,
        end:75,
        page:"/scenes"
    },
    {
        name: 'Resolution',
        color: "#8B7DEA",
        start:75,
        end:90,
        page:"/scenes"
    }
]

export function GetDataBaseSequences() {
    return db
}

export function UpdateDataBaseSequences(index, name, location) {
    db[index].name=name
    db[index].location=location

}

export function PostDataBaseSequence(name,location){
    const newLocation = {
        name: name,
        location: location,
        imag: "default-image.webp"
    };
    db.push(newLocation)
}

export function RemoveDataBaseSequence(index){
    db.splice(index,index)
}

