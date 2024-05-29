function BoardComponent(props) {
  return (
    <div
        id={"borad"+props.id}
        style={{
            display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
            position:"relative",
            border:"1px solid Silver", borderRadius:"3px",
            padding:"12px", paddingLeft:"15px", paddingRight:"15px",
            maxWidth:"300px", minWidth:"100px"
        }}
    >
        <div style={{fontWeight:"bold"}}>
            {props.name}
        </div>
        <div style={{width:"100%", border:"1px solid Silver", borderTop:"0px", margin:"10px"}}/>
        <div>
            {props.text}
        </div>
        {/* <div
            onClick={props.onClick}
            style={{
                position:"absolute", right:"4px", top:"6px", 
                color:"gray", textAlign:"center", width:"20px", height:"20px",
                cursor:"pointer"
            }}
        >x</div> */}
    </div>
  );
}

export default BoardComponent;
