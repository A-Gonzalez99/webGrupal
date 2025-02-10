/* eslint-disable jsx-a11y/alt-text */

function CardUpdateBanner({text, imagen}) {

    if(imagen==null){
        imagen = "default-image.webp"
    }

    if(text==null){
        text="Update banner"
    }

    console.log(imagen)
    return (
        <>
            <button className="cardBannerProyect">
                <div className='panelTitleCard'>
                    <p className="textUpdateBanner">{text}</p>
                </div>
                <img src={imagen}/>
        
            </button>
        </>
    )
}

export default CardUpdateBanner