export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ?  "#59E391" : "#cccccc"
    }
    return(
        <div style={styles} className="die-face" onClick={()=>props.handleClick(props.id)}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}