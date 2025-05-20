/* eslint-disable jsx-a11y/alt-text */

function CardUpdateBanner({text, imagen,handleFileChange}) {

    if(imagen==null){
        imagen = "default-image.webp"
    }

    if(text==null){
        text="Update banner"
    }

    return (
        <>
            <div className="cardBannerProyect">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    style={{ display: "none" }}
                    id="banner-input"
                />
                <label className="panelTitleCard" htmlFor="banner-input" style={{ cursor: "pointer" }}>
                    <span>Banner</span>
                </label>
                <img
                    src={imagen || "default-image.webp"}
                    alt="Vista previa"
                />
            </div>
        </>
    )
}

export default CardUpdateBanner