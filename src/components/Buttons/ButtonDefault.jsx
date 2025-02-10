function ButtonDefault({icon, text, click}) {
    return (
        <button onClick={click}>
              <span class="material-icons">{icon}</span><p>{text}</p>
        </button>
    )
}

export default ButtonDefault