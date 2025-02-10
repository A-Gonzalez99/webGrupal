function ButtonBelow({icon,clas ,text, click}) {
    return (
        <button onClick={click} className={clas}>
              <span class="material-icons">{icon}</span><p>{text}</p>
        </button>
    )
}
export default ButtonBelow