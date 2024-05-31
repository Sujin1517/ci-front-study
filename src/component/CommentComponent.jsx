function CommentComponent(props) {
    const sendComment = async (e) => {
        e.preventDefault();
        props.sendComment({
            boardId:props.id,
            content:document.getElementById("input_comment_"+props.id).value
        })
    }

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%"}}>
            <div 
                style={{paddingTop:"8px", cursor:"pointer", width:"100%", textAlign:"center"}}
                onClick={props.onClick}
            >
                {props.show?"△":"▽"}
            </div>

            {props.show?(
                <div style={{display:"flex", flexDirection:"column", paddingTop:"3px"}}>

                    {props.comments.length > 0 ?props.comments.map((e) => (
                        <div style={{position:"relative"}}>
                            <div style={{textAlign:"center", fontSize:"10pt", padding:"4px", borderTop:"1px solid LightGray"}}>
                                {e.content}
                            </div>
                            {/* <div
                                onClick={() => props.deleteComment(e.id)}
                                style={{
                                    position:"absolute", right:"2px", top:"2px", 
                                    color:"gray", textAlign:"center", width:"20px", height:"20px",
                                    cursor:"pointer"
                                }}
                            >x</div> */}
                        </div>
                    )):(
                        <div style={{textAlign:"center", fontSize:"10pt", padding:"4.5px", color:"silver"}}>
                            댓글이 없습니다
                        </div>
                    )}

                    <form onSubmit={(e) => sendComment(e)}>
                        <input 
                            onsubmit={(e) => sendComment(e)}
                            style={{width:"223px", height:"20px", marginRight:"3px"}} required id={"input_comment_"+props.id}
                        />
                        <input
                            type="submit"
                            style={{width:"66px", height:"26px", backgroundColor:"#fff", borderRadius:"3px", cursor:"pointer"}}
                            value={"작성하기"}
                        />
                    </form>

                </div>
            ):""}
        </div>
    );
}
  
export default CommentComponent;
  