
const db = [
    {
        name: 'Introduction to the World',
        color: "#2E12E2",
        start:0,
        end:2,
        page:"/scene"
    },
    {
        name: 'Protagonist in his Environment',
        color: "#00FF2F",
        start:2,
        end:4,
        page:"/scene"
    },
    {
        name: 'Inciting Incident',
        color: "#D923DF",
        start:4,
        end:6,
        page:"/scene"
    },
    {
        name: 'Initial Conflict',
        color: "#F34868",
        start:6,
        end:8,
        page:"/scene"
    },
    {
        name: "Protagonist's Decision",
        color: "#3ED0ED",
        start:8,
        end:10,
        page:"/scene"
    },
    {
        name: 'Introduction of an Antagonist',
        color: "#77E051",
        start:10,
        end:12,
        page:"/scene"
    },
    {
        name: 'Presentation Climax',
        color: "#F75931",
        start:12,
        end:15,
        page:"/scene"
    },
]

export function GetDataBaseScenes() {
    return db
}

export function UpdateDataBaseScenes(index, name, location) {
    db[index].name=name
    db[index].location=location

}

export function PostDataBaseScenes(name,location){
    const newLocation = {
        name: name,
        location: location,
        imag: "default-image.webp"
    };
    db.push(newLocation)
}

export function RemoveDataBaseScenes(index){
    db.splice(index,index)
}

